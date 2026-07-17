(function(){

  // Lista de jogadores vem do arquivo players.js (carregado antes deste script)
  const players = PLAYERS;

  // ---------- dificuldade ----------
  let currentDifficulty = "facil";

  function activePlayers(){
    const filtered = players.filter(p => p.dificuldade === currentDifficulty);
    return filtered.length ? filtered : players;
  }

  // ---------- state ----------
  // Cada carta de dica tem um valor fixo e diferente das outras (definido
  // acima em HINT_POOL), pensado para que usar todas as 5 deixe pelo menos
  // 20 pontos sobrando (4 chances de chute a −5 cada).
  const BASE_POINTS = 100;
  const MISS_PENALTY = 5;
  const HINT_POOL = [
    {key:"posicao", label:"Posição", cost:5},
    {key:"estado", label:"Estado natal", cost:10},
    {key:"decada", label:"Época", cost:15},
    {key:"time", label:"Clube marcante", cost:20},
    {key:"titulo", label:"Título marcante", cost:30}
  ];

  // Ícone (SVG em cinza, traço simples) para o verso de cada carta de dica
  const HINT_ICONS = {
    posicao: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7.2l3.4 2.4-1.3 4h-4.2l-1.3-4L12 7.2Z"/>
      <path d="M12 7.2V4M15.4 9.6l2.9-1.7M14.1 13.6l1.7 2.7M9.9 13.6l-1.7 2.7M8.6 9.6l-2.9-1.7"/>
    </svg>`,
    estado: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <ellipse cx="12" cy="12" rx="4" ry="9"/>
      <path d="M3.3 9.5h17.4M3.3 14.5h17.4"/>
    </svg>`,
    decada: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4.5 5.3c1.9-1 4.4-1 6 .1v13.3c-1.6-1.1-4.1-1.1-6-.1V5.3Z"/>
      <path d="M19.5 5.3c-1.9-1-4.4-1-6 .1v13.3c1.6-1.1 4.1-1.1 6-.1V5.3Z"/>
    </svg>`,
    time: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3.4l7 2.5v5.2c0 4.7-3 7.8-7 9.4-4-1.6-7-4.7-7-9.4V5.9l7-2.5Z"/>
      <path d="M12 3.4v16.9"/>
    </svg>`,
    titulo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/>
      <path d="M8 5H5.6a2.4 2.4 0 0 0 0 4.8H8M16 5h2.4a2.4 2.4 0 0 1 0 4.8H16"/>
      <path d="M12 12v3M9 19h6M10 19v-2.1c0-.4.3-.7.7-.7h2.6c.4 0 .7.3.7.7V19"/>
    </svg>`
  };

  let pool = shuffle([...activePlayers()]);
  let current = null;
  let hintCostUsed = 0;
  let remainingHints = [];
  let cardsOpen = false;
  let totalScore = 0;
  let round = 1;
  let hits = 0;
  let roundOver = false;
  let spinning = false;
  let missPenalty = 0;

  // ---------- save local (pontuação + histórico) ----------
  // Guarda o placar e as últimas partidas no localStorage do navegador,
  // então o jogador não perde o progresso ao fechar a aba ou recarregar.
  const STORAGE_SCORE_KEY = "camisa100.totalScore";
  const STORAGE_HISTORY_KEY = "camisa100.history";
  const HISTORY_LIMIT = 10;

  function loadSavedScore(){
    try{
      const raw = localStorage.getItem(STORAGE_SCORE_KEY);
      const n = parseInt(raw, 10);
      return Number.isFinite(n) ? n : 0;
    } catch(e){
      return 0;
    }
  }

  function saveScore(){
    try{ localStorage.setItem(STORAGE_SCORE_KEY, String(totalScore)); }
    catch(e){ /* localStorage indisponível (modo privado, etc.) — ignora */ }
  }

  function loadHistory(){
    try{
      const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch(e){
      return [];
    }
  }

  function addHistoryEntry(entry){
    try{
      const list = loadHistory();
      list.unshift(entry);
      if(list.length > HISTORY_LIMIT) list.length = HISTORY_LIMIT;
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(list));
    } catch(e){ /* ignora se não puder salvar */ }
  }

  // ---------- áudio ----------
  // Sons curtos sintetizados na hora via Web Audio API (sem arquivos externos).
  let audioCtx = null;
  let soundEnabled = true;

  function getAudioCtx(){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(!Ctx) return null;
    if(!audioCtx) audioCtx = new Ctx();
    if(audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function playTone({freq = 440, duration = 0.12, type = "sine", volume = 0.18, delay = 0, glideTo = null} = {}){
    if(!soundEnabled) return;
    const ctx = getAudioCtx();
    if(!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if(glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  const sfx = {
    click(){ playTone({freq:520, duration:0.05, type:"square", volume:0.10}); },
    tick(){ playTone({freq:640 + Math.random()*160, duration:0.045, type:"square", volume:0.09}); },
    settle(){
      playTone({freq:392, duration:0.12, type:"triangle", volume:0.20});
      playTone({freq:523.25, duration:0.20, type:"triangle", volume:0.18, delay:0.08});
    },
    correct(){
      [523.25, 659.25, 783.99].forEach((f, i) => playTone({freq:f, duration:0.16, type:"triangle", volume:0.20, delay:i * 0.09}));
    },
    wrong(){
      playTone({freq:220, duration:0.18, type:"sawtooth", volume:0.15, glideTo:140});
    },
    hintOpen(){ playTone({freq:600, duration:0.08, type:"sine", volume:0.13}); },
    hintPick(){
      playTone({freq:660, duration:0.10, type:"sine", volume:0.17});
      playTone({freq:880, duration:0.14, type:"sine", volume:0.15, delay:0.07});
    },
    zeroOut(){
      [392, 330, 262].forEach((f, i) => playTone({freq:f, duration:0.20, type:"sawtooth", volume:0.15, delay:i * 0.12}));
    },
    reveal(){ playTone({freq:340, duration:0.20, type:"sine", volume:0.14}); }
  };

  // ---------- dom ----------
  const jerseyBtn = document.getElementById("jerseyBtn");
  const jerseyTrack = document.getElementById("jerseyTrack");
  const spinHint = document.getElementById("spinHint");
  const pointsValue = document.getElementById("pointsValue");
  const pointsFloat = document.getElementById("pointsFloat");
  const ringValue = document.getElementById("ringValue");
  const cluesList = document.getElementById("cluesList");
  const hintBtn = document.getElementById("hintBtn");
  const hintOverlay = document.getElementById("hintOverlay");
  const hintCards = document.getElementById("hintCards");
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const revealBtn = document.getElementById("revealBtn");
  const feedback = document.getElementById("feedback");
  const answerOverlay = document.getElementById("answerOverlay");
  const answerCard = document.getElementById("answerCard");
  const answerCloseBtn = document.getElementById("answerCloseBtn");
  const totalScoreEl = document.getElementById("totalScore");
  const scoreBar = document.getElementById("scoreBar");
  const scoreFloat = document.getElementById("scoreFloat");
  const playersList = document.getElementById("playersList");
  const soundToggle = document.getElementById("soundToggle");
  const difficultyBar = document.getElementById("difficultyBar");
  const historyToggle = document.getElementById("historyToggle");
  const historyOverlay = document.getElementById("historyOverlay");
  const historyList = document.getElementById("historyList");
  const historyCloseBtn = document.getElementById("historyCloseBtn");

  // Anima a troca do placar: sobe o número em contagem, faz a barra
  // pulsar e mostra um "+N" subindo e sumindo por cima.
  let scoreAnim = null;
  function animateScoreTo(target, gained){
    const start = parseInt(totalScoreEl.textContent, 10) || 0;
    if(scoreAnim) cancelAnimationFrame(scoreAnim);
    const duration = 500;
    const t0 = performance.now();
    function step(now){
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      totalScoreEl.textContent = Math.round(start + (target - start) * eased);
      if(p < 1) scoreAnim = requestAnimationFrame(step);
    }
    scoreAnim = requestAnimationFrame(step);

    scoreBar.classList.remove("pop", "pop-neg");
    void scoreBar.offsetWidth;
    scoreBar.classList.add(gained < 0 ? "pop-neg" : "pop");

    if(gained !== 0){
      scoreFloat.textContent = gained > 0 ? `+${gained}` : `−${Math.abs(gained)}`;
      scoreFloat.classList.toggle("neg", gained < 0);
      scoreFloat.classList.remove("rise");
      void scoreFloat.offsetWidth;
      scoreFloat.classList.add("rise");
    }
  }

  // Feedback visual de perda de pontos na rodada (chute errado): pisca
  // o número em vermelho e sobe um "-5" por cima, sem mexer no placar total.
  function bumpRoundPoints(delta){
    const b = pointsValue;
    b.classList.remove("flash");
    void b.offsetWidth;
    b.classList.add("flash");

    pointsFloat.textContent = delta > 0 ? `+${delta}` : `−${Math.abs(delta)}`;
    pointsFloat.classList.remove("rise");
    void pointsFloat.offsetWidth;
    pointsFloat.classList.add("rise");
  }

  const RING_CIRC = 2 * Math.PI * 98;
  ringValue.setAttribute("stroke-dasharray", RING_CIRC.toFixed(2));

  // Recupera a pontuação salva (se existir) para o jogador não perder
  // o progresso ao voltar ao jogo.
  totalScore = loadSavedScore();
  totalScoreEl.textContent = totalScore;

  playersList.innerHTML = players.map(p => `<option value="${p.nome}">`).join("");

  const JERSEY_PATH = "M32 8 L10 14 L2 32 L18 37 L20 26 L20 92 L80 92 L80 26 L82 37 L98 32 L90 14 L68 8 C 62 8 56 20 50 20 C 44 20 38 8 32 8 Z";

  function makeJerseySlot(number){
    const slot = document.createElement("div");
    slot.className = "jersey-slot";
    slot.innerHTML = `
      <svg class="jersey-svg" viewBox="0 0 100 100">
        <path d="${JERSEY_PATH}" fill="#f4c531" stroke="#25200a" stroke-width="2.5" stroke-linejoin="round"/>
      </svg>
      <div class="jersey-number">${number}</div>`;
    return slot;
  }

  function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function normalize(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  function currentPoints(){
    return Math.max(BASE_POINTS - hintCostUsed - missPenalty, 0);
  }

  function updateRing(){
    const pct = currentPoints() / BASE_POINTS;
    const offset = RING_CIRC * (1 - pct);
    ringValue.setAttribute("stroke-dashoffset", offset.toFixed(2));
    ringValue.style.stroke = pct > 0.55 ? "#f4c531" : (pct > 0.25 ? "#e8934a" : "#e15a4c");
  }

  function pickPlayer(){
    if(pool.length === 0) pool = shuffle([...activePlayers()]);
    return pool.pop();
  }

  function startRound(){
    hintCostUsed = 0;
    remainingHints = shuffle([...HINT_POOL]);
    cardsOpen = false;
    roundOver = false;
    missPenalty = 0;

    pointsValue.textContent = currentPoints();
    updateRing();
    renderClueSlots();
    hintOverlay.classList.remove("show");
    hintCards.innerHTML = "";
    document.body.classList.remove("no-scroll");
    feedback.textContent = "";
    feedback.className = "info";
    answerOverlay.classList.remove("show");
    answerCard.innerHTML = "";
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    hintBtn.disabled = false;
    hintBtn.classList.remove("hidden");
    revealBtn.disabled = false;
    jerseyBtn.classList.remove("clickable");
    guessInput.focus();
  }

  function spinToNextPlayer(){
    if(spinning) return;
    spinning = true;
    round++;
    jerseyBtn.classList.remove("clickable");
    jerseyBtn.classList.add("spinning");

    const next = pickPlayer();
    const numberEl = jerseyTrack.querySelector(".jersey-number");

    // A camisa fica parada; só o número dentro dela troca aleatoriamente,
    // cada vez mais devagar, até parar no número sorteado. Tudo feito com
    // setTimeout encadeado (sem CSS transition/transitionend), então
    // sempre termina de forma previsível.
    const TICKS = 16;
    let tick = 0;

    function nextDelay(){
      // intervalo cresce de ~60ms até ~260ms conforme se aproxima do fim
      const p = tick / (TICKS - 1);
      return 60 + (260 - 60) * (p * p);
    }

    function tickNumber(){
      tick++;
      const isLast = tick >= TICKS;
      numberEl.textContent = isLast ? next.numero : players[Math.floor(Math.random() * players.length)].numero;

      numberEl.classList.remove("tick", "settle");
      void numberEl.offsetWidth;
      numberEl.classList.add(isLast ? "settle" : "tick");
      isLast ? sfx.settle() : sfx.tick();

      if(isLast){
        current = next;
        spinning = false;
        jerseyBtn.classList.remove("spinning");
        startRound();
        return;
      }

      setTimeout(tickNumber, nextDelay());
    }

    setTimeout(tickNumber, nextDelay());
  }

  function renderClueSlots(){
    cluesList.innerHTML = "";
    HINT_POOL.forEach(hint => {
      const li = document.createElement("li");
      li.dataset.key = hint.key;
      li.className = "locked";
      li.innerHTML = `<span class="tag">${hint.label}</span><span class="val">?</span>`;
      cluesList.appendChild(li);
    });
  }

  function revealClue(key, label, value){
    const li = cluesList.querySelector(`li[data-key="${key}"]`);
    if(!li) return;
    li.classList.remove("locked");
    li.classList.add("revealed");
    li.querySelector(".val").textContent = value;
  }

  function giveHint(){
    if(roundOver || cardsOpen) return;
    if(remainingHints.length === 0){
      feedback.textContent = "Todas as dicas já foram reveladas.";
      feedback.className = "info";
      return;
    }
    if(remainingHints.length === HINT_POOL.length){
      giveFreeRandomHint();
    } else {
      openHintCards();
    }
  }

  function giveFreeRandomHint(){
    cardsOpen = true;
    hintBtn.disabled = true;
    feedback.textContent = "Sua primeira dica é grátis!";
    feedback.className = "info";
    sfx.hintOpen();

    // A dica grátis é sorteada aleatoriamente entre as dicas disponíveis.
    const hint = remainingHints[Math.floor(Math.random() * remainingHints.length)];

    hintCards.innerHTML = "";
    const card = document.createElement("div");
    card.className = "hint-card";
    card.innerHTML = `
      <div class="hint-card-inner">
        <div class="hint-card-face hint-card-back">
          <span class="hint-card-icon">${HINT_ICONS[hint.key]}</span>
          <span class="hint-card-price">grátis</span>
        </div>
        <div class="hint-card-face hint-card-front">
          <span class="tag"></span>
          <span class="val"></span>
        </div>
      </div>`;
    hintCards.appendChild(card);

    hintOverlay.classList.add("show");
    document.body.classList.add("no-scroll");

    setTimeout(() => pickHintCard(card, hint, true), 750);
  }

  function openHintCards(){
    cardsOpen = true;
    hintBtn.disabled = true;
    feedback.textContent = "Escolha uma carta: cada uma tem um valor diferente.";
    feedback.className = "info";
    sfx.hintOpen();

    const offered = shuffle([...remainingHints]);

    hintCards.innerHTML = "";
    offered.forEach(hint => {
      const card = document.createElement("div");
      card.className = "hint-card";
      card.innerHTML = `
        <div class="hint-card-inner">
          <div class="hint-card-face hint-card-back">
            <span class="hint-card-icon">${HINT_ICONS[hint.key]}</span>
            <span class="hint-card-price">${hint.cost === 0 ? "grátis" : `\u2212${hint.cost}`}</span>
          </div>
          <div class="hint-card-face hint-card-front">
            <span class="tag"></span>
            <span class="val"></span>
          </div>
        </div>`;
      card.addEventListener("click", () => pickHintCard(card, hint));
      hintCards.appendChild(card);
    });

    hintOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }

  // Fecha a seleção de cartas sem obrigar o jogador a escolher uma,
  // usado quando ele clica na área escura fora das cartas.
  function closeHintCards(){
    if(!cardsOpen) return;
    cardsOpen = false;
    sfx.click();
    hintOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
    hintCards.innerHTML = "";
    hintBtn.disabled = roundOver || remainingHints.length === 0;
  }

  function pickHintCard(cardEl, hint, isFree = false){
    if(!cardsOpen) return;
    cardsOpen = false;
    sfx.hintPick();

    cardEl.classList.add("flipped", "picked");
    cardEl.querySelector(".tag").textContent = hint.label;
    cardEl.querySelector(".val").textContent = current[hint.key];
    [...hintCards.children].forEach(c => { if(c !== cardEl) c.classList.add("discarded"); });

    remainingHints = remainingHints.filter(h => h.key !== hint.key);
    if(!isFree) hintCostUsed += hint.cost;
    pointsValue.textContent = currentPoints();
    updateRing();

    setTimeout(() => {
      if(roundOver) return;
      revealClue(hint.key, hint.label, current[hint.key]);
      hintOverlay.classList.remove("show");
      document.body.classList.remove("no-scroll");
      hintCards.innerHTML = "";
      const pts = currentPoints();
      if(pts <= 0){
        hintBtn.disabled = true;
        guessInput.disabled = true;
        guessBtn.disabled = true;
        feedback.textContent = "A rodada zerou! Revelando o jogador...";
        feedback.className = "bad";
        sfx.zeroOut();
        setTimeout(() => finishRound(false), 900);
      } else {
        hintBtn.disabled = remainingHints.length === 0;
        feedback.textContent = `Dica revelada. Rodada agora vale ${pts} pontos.`;
        feedback.className = "info";
      }
    }, 1300);
  }

  function checkGuess(){
    if(roundOver) return;
    const guess = normalize(guessInput.value);
    if(guess.length < 2){
      feedback.textContent = "Digite um nome antes de chutar.";
      feedback.className = "info";
      return;
    }
    const match = current.aliases.some(a => normalize(a) === guess) ||
                  current.aliases.some(a => normalize(a).includes(guess) && guess.length >= 4) ||
                  normalize(current.nome).includes(guess) && guess.length >= 4;

    if(match){
      const pts = currentPoints();
      totalScore += pts;
      hits++;
      animateScoreTo(totalScore, pts);
      feedback.textContent = `Isso aí! +${pts} pontos.`;
      feedback.className = "good";
      sfx.correct();
      finishRound(true, pts);
    } else {
      missPenalty += MISS_PENALTY;
      const pts = currentPoints();
      pointsValue.textContent = pts;
      updateRing();
      bumpRoundPoints(-MISS_PENALTY);

      if(pts <= 0){
        feedback.textContent = "A rodada zerou! Revelando o jogador...";
        feedback.className = "bad";
        guessInput.disabled = true;
        guessBtn.disabled = true;
        hintBtn.disabled = true;
        sfx.zeroOut();
        setTimeout(() => finishRound(false), 900);
      } else {
        feedback.textContent = `Não foi essa. −${MISS_PENALTY} pontos na rodada. Tente de novo ou peça uma dica.`;
        feedback.className = "bad";
        sfx.wrong();
        setTimeout(() => feedback.classList.remove("bad"), 300);
      }
    }
  }

  function finishRound(won, pointsEarned = 0){
    roundOver = true;
    cardsOpen = false;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    hintBtn.classList.remove("hidden");
    hintOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
    hintCards.innerHTML = "";
    revealBtn.disabled = true;
    jerseyBtn.classList.add("clickable");

    answerCard.innerHTML = `
      <b>${current.nome}</b> — camisa ${current.numero}, ${current.posicao}<br>
      Apelido: ${current.apelido} · Clube marcante: ${current.time}<br>
      Naturalidade: ${current.estado} · Época: ${current.decada}<br>
      Destaque: ${current.titulo}
    `;
    answerOverlay.classList.add("show");
    document.body.classList.add("no-scroll");

    if(!won){
      feedback.textContent = `Resposta revelada: ${current.nome}. Rodada sem pontos.`;
      feedback.className = "info";
    }

    if(won) saveScore();
    addHistoryEntry({
      nome: current.nome,
      numero: current.numero,
      dificuldade: currentDifficulty,
      won: !!won,
      points: won ? pointsEarned : 0,
      when: Date.now()
    });
  }

  hintBtn.addEventListener("click", () => { sfx.click(); giveHint(); });
  guessBtn.addEventListener("click", () => { sfx.click(); checkGuess(); });
  guessInput.addEventListener("keydown", e => { if(e.key === "Enter") checkGuess(); });
  revealBtn.addEventListener("click", () => { sfx.reveal(); finishRound(false); });

  function closeAnswerOverlay(){
    sfx.click();
    answerOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }
  hintOverlay.addEventListener("click", e => {
    // Só fecha se o clique foi na área escura, fora das cartas e do título.
    if(!e.target.closest(".hint-card") && !e.target.closest(".hint-overlay-title")) closeHintCards();
  });

  answerCloseBtn.addEventListener("click", closeAnswerOverlay);
  answerOverlay.addEventListener("click", e => {
    if(e.target === answerOverlay) closeAnswerOverlay();
  });

  // ---------- histórico de partidas ----------
  const DIFF_LABEL = {facil:"Fácil", medio:"Médio", dificil:"Difícil"};

  function formatHistoryDate(ts){
    const d = new Date(ts);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm} ${hh}:${min}`;
  }

  function renderHistory(){
    const list = loadHistory();
    if(list.length === 0){
      historyList.innerHTML = `<div class="history-empty">Nenhuma partida ainda. Jogue uma rodada para começar seu histórico!</div>`;
      return;
    }
    historyList.innerHTML = list.map(item => `
      <div class="history-item ${item.won ? "won" : "lost"}">
        <div class="history-badge">${item.won ? "✓" : "✕"}</div>
        <div class="history-info">
          <span class="history-name">${item.nome} <span style="color:var(--muted); font-weight:500;">· #${item.numero}</span></span>
          <span class="history-meta">${DIFF_LABEL[item.dificuldade] || item.dificuldade} · ${formatHistoryDate(item.when)}</span>
        </div>
        <div class="history-points">${item.won ? `+${item.points}` : "0"}</div>
      </div>
    `).join("");
  }

  function openHistory(){
    sfx.click();
    renderHistory();
    historyOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }

  function closeHistoryOverlay(){
    sfx.click();
    historyOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  historyToggle.addEventListener("click", openHistory);
  historyCloseBtn.addEventListener("click", closeHistoryOverlay);
  historyOverlay.addEventListener("click", e => {
    if(e.target === historyOverlay) closeHistoryOverlay();
  });

  jerseyBtn.addEventListener("click", () => {
    if(!roundOver || spinning) return;
    sfx.click();
    spinToNextPlayer();
  });
  jerseyBtn.addEventListener("keydown", e => {
    if((e.key === "Enter" || e.key === " ") && roundOver && !spinning){
      e.preventDefault();
      sfx.click();
      spinToNextPlayer();
    }
  });

  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundToggle.classList.toggle("muted", !soundEnabled);
    soundToggle.setAttribute("aria-pressed", String(!soundEnabled));
    soundToggle.setAttribute("aria-label", soundEnabled ? "Desativar som" : "Ativar som");
    if(soundEnabled) sfx.click();
  });

  difficultyBar.addEventListener("click", e => {
    const btn = e.target.closest(".diff-btn");
    if(!btn || spinning) return;
    const diff = btn.dataset.diff;
    if(diff === currentDifficulty) return;

    sfx.click();
    currentDifficulty = diff;
    difficultyBar.querySelectorAll(".diff-btn").forEach(b => b.classList.toggle("active", b === btn));

    pool = shuffle([...activePlayers()]);
    current = pickPlayer();
    const numberEl = jerseyTrack.querySelector(".jersey-number");
    if(numberEl) numberEl.textContent = current.numero;
    startRound();
  });

  current = pickPlayer();
  jerseyTrack.appendChild(makeJerseySlot(current.numero));
  startRound();

  const footerYear = document.getElementById("footerYear");
  if(footerYear) footerYear.textContent = new Date().getFullYear();

  // Bloqueia o menu de contexto (clique direito / long-press) e a seleção
  // de texto/imagens em toda a página. O campo de chute (input) continua
  // funcionando normalmente para digitar.
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("dragstart", e => e.preventDefault());
  document.addEventListener("selectstart", e => {
    const tag = e.target.tagName;
    if(tag === "INPUT" || tag === "TEXTAREA") return;
    e.preventDefault();
  });
})();
