(function(){

  const players = [
    {nome:"Pelé", numero:10, posicao:"Atacante", apelido:"O Rei do Futebol", time:"Santos", estado:"Minas Gerais", decada:"1950–1970", titulo:"3 Copas do Mundo (1958, 1962, 1970)", aliases:["pele","edson arantes do nascimento","o rei"]},
    {nome:"Garrincha", numero:7, posicao:"Ponta-direita", apelido:"Anjo das Pernas Tortas", time:"Botafogo", estado:"Rio de Janeiro", decada:"1950–1960", titulo:"2 Copas do Mundo (1958, 1962)", aliases:["garrincha","mane garrincha","manuel francisco dos santos"]},
    {nome:"Ronaldo Nazário", numero:9, posicao:"Atacante", apelido:"Fenômeno", time:"Inter de Milão / Real Madrid / Barcelona", estado:"Rio de Janeiro", decada:"1990–2000", titulo:"2 Copas do Mundo (1994, 2002)", aliases:["ronaldo","ronaldo nazario","r9","fenomeno"]},
    {nome:"Ronaldinho Gaúcho", numero:10, posicao:"Meia-atacante", apelido:"Bruxo", time:"Barcelona / Milan / Grêmio", estado:"Rio Grande do Sul", decada:"2000–2010", titulo:"Copa do Mundo 2002 e Champions League 2006", aliases:["ronaldinho","ronaldinho gaucho","ronaldo de assis moreira"]},
    {nome:"Romário", numero:11, posicao:"Atacante", apelido:"Baixinho", time:"Vasco / Barcelona / Flamengo", estado:"Rio de Janeiro", decada:"1990", titulo:"Copa do Mundo 1994", aliases:["romario","romario de souza faria"]},
    {nome:"Rivaldo", numero:10, posicao:"Meia-atacante", apelido:"Rivaldo", time:"Barcelona / Palmeiras", estado:"Pernambuco", decada:"1990–2000", titulo:"Copa do Mundo 2002 e Bola de Ouro 1999", aliases:["rivaldo"]},
    {nome:"Zico", numero:10, posicao:"Meia", apelido:"Galinho de Quintino", time:"Flamengo", estado:"Rio de Janeiro", decada:"1970–1980", titulo:"Libertadores 1981 e Mundial de Clubes", aliases:["zico","arthur antunes coimbra"]},
    {nome:"Sócrates", numero:8, posicao:"Meia", apelido:"Doutor", time:"Corinthians", estado:"Pará", decada:"1980", titulo:"Ídolo da Democracia Corintiana", aliases:["socrates","socrates brasileiro"]},
    {nome:"Cafu", numero:2, posicao:"Lateral-direito", apelido:"Pendragon", time:"São Paulo / Roma / Milan", estado:"São Paulo", decada:"1990–2000", titulo:"Único bicampeão mundial como capitão (1994 e 2002)", aliases:["cafu","marcos evangelista de moraes"]},
    {nome:"Roberto Carlos", numero:6, posicao:"Lateral-esquerdo", apelido:"Roberto Carlos", time:"Real Madrid", estado:"São Paulo", decada:"1990–2000", titulo:"Copa do Mundo 2002 e várias Champions League", aliases:["roberto carlos"]},
    {nome:"Kaká", numero:22, posicao:"Meia-atacante", apelido:"Kaká", time:"São Paulo / Milan / Real Madrid", estado:"São Paulo", decada:"2000–2010", titulo:"Copa do Mundo 2002 e Bola de Ouro 2007", aliases:["kaka","ricardo izecson dos santos leite"]},
    {nome:"Neymar Jr", numero:10, posicao:"Atacante", apelido:"Ney", time:"Santos / Barcelona / PSG / Al-Hilal", estado:"São Paulo", decada:"2010–2020", titulo:"Ouro olímpico em 2016", aliases:["neymar","neymar jr","neymar da silva santos junior"]},
    {nome:"Marta", numero:10, posicao:"Atacante", apelido:"Rainha", time:"Vasco / Umeå / Orlando Pride", estado:"Alagoas", decada:"2000–2020", titulo:"6 vezes eleita melhor do mundo pela FIFA", aliases:["marta","marta vieira da silva"]},
    {nome:"Taffarel", numero:1, posicao:"Goleiro", apelido:"Taffarel", time:"Internacional / Parma", estado:"Rio Grande do Sul", decada:"1990", titulo:"Copa do Mundo 1994", aliases:["taffarel","claudio taffarel"]},
    {nome:"Vinícius Júnior", numero:7, posicao:"Atacante", apelido:"Vini Jr", time:"Flamengo / Real Madrid", estado:"Rio de Janeiro", decada:"2020", titulo:"Champions League com o Real Madrid", aliases:["vinicius junior","vini jr","vinicius"]},
    {nome:"Casemiro", numero:5, posicao:"Volante", apelido:"Casemiro", time:"São Paulo / Real Madrid / Manchester United", estado:"São Paulo", decada:"2010–2020", titulo:"5 títulos de Champions League", aliases:["casemiro"]},
    {nome:"Thiago Silva", numero:3, posicao:"Zagueiro", apelido:"Monstro", time:"Fluminense / PSG / Chelsea", estado:"Rio de Janeiro", decada:"2010–2020", titulo:"Champions League 2021 pelo Chelsea", aliases:["thiago silva"]},
    {nome:"Marcelo", numero:12, posicao:"Lateral-esquerdo", apelido:"Marcelo", time:"Fluminense / Real Madrid", estado:"Rio de Janeiro", decada:"2010–2020", titulo:"Jogador mais titulado da história do Real Madrid", aliases:["marcelo"]},
    {nome:"Adriano", numero:9, posicao:"Atacante", apelido:"Imperador", time:"Flamengo / Inter de Milão", estado:"Rio de Janeiro", decada:"2000", titulo:"Copa América 2004 e 2007", aliases:["adriano","adriano imperador"]},
    {nome:"Robinho", numero:7, posicao:"Atacante", apelido:"Robinho", time:"Santos / Real Madrid / Milan", estado:"São Paulo", decada:"2000–2010", titulo:"Libertadores 2011 pelo Santos", aliases:["robinho"]},
    {nome:"Hulk", numero:7, posicao:"Atacante", apelido:"Hulk", time:"Porto / Zenit / Atlético-MG", estado:"Minas Gerais", decada:"2010–2020", titulo:"Vários títulos estaduais e nacionais", aliases:["hulk","givanildo vieira de sousa"]},
    {nome:"Fabinho", numero:3, posicao:"Volante", apelido:"Fabinho", time:"Liverpool / Al-Ittihad", estado:"São Paulo", decada:"2010–2020", titulo:"Champions League 2019 pelo Liverpool", aliases:["fabinho"]},
    {nome:"Éder Militão", numero:3, posicao:"Zagueiro", apelido:"Militão", time:"Real Madrid", estado:"São Paulo", decada:"2020", titulo:"Champions League com o Real Madrid", aliases:["eder militao","militao"]},
    {nome:"Raphinha", numero:11, posicao:"Atacante", apelido:"Raphinha", time:"Barcelona", estado:"Rio Grande do Sul", decada:"2020", titulo:"Titular na seleção brasileira", aliases:["raphinha","raphael dias belloli"]},
    {nome:"Rodrygo", numero:11, posicao:"Atacante", apelido:"Rodrygo", time:"Real Madrid", estado:"São Paulo", decada:"2020", titulo:"Champions League com o Real Madrid", aliases:["rodrygo"]},
    {nome:"Gabriel Jesus", numero:9, posicao:"Atacante", apelido:"Jesus", time:"Palmeiras / Manchester City / Arsenal", estado:"São Paulo", decada:"2010–2020", titulo:"Ouro olímpico em 2016", aliases:["gabriel jesus"]},
    {nome:"Richarlison", numero:9, posicao:"Atacante", apelido:"Pombo", time:"Tottenham", estado:"Espírito Santo", decada:"2020", titulo:"Ouro olímpico em 2020", aliases:["richarlison"]},
    {nome:"Bruno Guimarães", numero:39, posicao:"Volante", apelido:"BG", time:"Newcastle United", estado:"Rio de Janeiro", decada:"2020", titulo:"Titular na seleção brasileira", aliases:["bruno guimaraes","bg"]},
    {nome:"Dani Alves", numero:2, posicao:"Lateral-direito", apelido:"Dani Alves", time:"Barcelona / PSG", estado:"Bahia", decada:"2000–2010", titulo:"Jogador mais titulado da história do futebol", aliases:["dani alves"]},
    {nome:"David Luiz", numero:4, posicao:"Zagueiro", apelido:"David Luiz", time:"Chelsea / Arsenal", estado:"São Paulo", decada:"2010–2020", titulo:"Europa League 2019 pelo Chelsea", aliases:["david luiz"]},
    {nome:"Alisson Becker", numero:1, posicao:"Goleiro", apelido:"Alisson", time:"Liverpool", estado:"Rio Grande do Sul", decada:"2010–2020", titulo:"Champions League 2019 pelo Liverpool", aliases:["alisson","alisson becker"]},
    {nome:"Ederson", numero:1, posicao:"Goleiro", apelido:"Ederson", time:"Manchester City", estado:"São Paulo", decada:"2010–2020", titulo:"Várias Premier League pelo Manchester City", aliases:["ederson"]},
    {nome:"Roberto Firmino", numero:9, posicao:"Atacante", apelido:"Bobby", time:"Liverpool", estado:"Alagoas", decada:"2010–2020", titulo:"Champions League 2019 pelo Liverpool", aliases:["firmino","roberto firmino","bobby firmino"]},
    {nome:"Philippe Coutinho", numero:10, posicao:"Meia-atacante", apelido:"Magrinho", time:"Liverpool / Barcelona", estado:"Rio de Janeiro", decada:"2010–2020", titulo:"Titular histórico da seleção", aliases:["coutinho","philippe coutinho"]},
    {nome:"Willian", numero:10, posicao:"Atacante", apelido:"Willian", time:"Chelsea / Arsenal", estado:"Bahia", decada:"2010–2020", titulo:"Europa League 2019 pelo Chelsea", aliases:["willian"]}
  ];

  // ---------- state ----------
  // Cost to reveal each successive hint card: a 1ª é grátis, as demais custam
  // 20 pontos cada, então a pontuação da rodada sempre cai em números
  // redondos: 100 -> 80 -> 60 -> 40 -> 20. Como sobram 20 pontos mesmo
  // usando as 5 dicas, elas nunca zeram a rodada sozinhas — só os chutes
  // errados (MISS_PENALTY) podem fazer isso.
  const HINT_COSTS = [0, 20, 20, 20, 20];
  const BASE_POINTS = 100;
  const MISS_PENALTY = 5;
  const HINT_POOL = [
    {key:"posicao", label:"Posição"},
    {key:"time", label:"Clube marcante"},
    {key:"estado", label:"Estado natal"},
    {key:"decada", label:"Época"},
    {key:"titulo", label:"Título marcante"}
  ];

  let pool = shuffle([...players]);
  let current = null;
  let hintsUsed = 0;
  let remainingHints = [];
  let cardsOpen = false;
  let totalScore = 0;
  let round = 1;
  let hits = 0;
  let roundOver = false;
  let spinning = false;
  let missPenalty = 0;

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

  function playTone({freq = 440, duration = 0.12, type = "sine", volume = 0.08, delay = 0, glideTo = null} = {}){
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
    click(){ playTone({freq:520, duration:0.05, type:"square", volume:0.045}); },
    tick(){ playTone({freq:640 + Math.random()*160, duration:0.045, type:"square", volume:0.04}); },
    settle(){
      playTone({freq:392, duration:0.12, type:"triangle", volume:0.09});
      playTone({freq:523.25, duration:0.20, type:"triangle", volume:0.08, delay:0.08});
    },
    correct(){
      [523.25, 659.25, 783.99].forEach((f, i) => playTone({freq:f, duration:0.16, type:"triangle", volume:0.09, delay:i * 0.09}));
    },
    wrong(){
      playTone({freq:220, duration:0.18, type:"sawtooth", volume:0.07, glideTo:140});
    },
    hintOpen(){ playTone({freq:600, duration:0.08, type:"sine", volume:0.06}); },
    hintPick(){
      playTone({freq:660, duration:0.10, type:"sine", volume:0.08});
      playTone({freq:880, duration:0.14, type:"sine", volume:0.07, delay:0.07});
    },
    zeroOut(){
      [392, 330, 262].forEach((f, i) => playTone({freq:f, duration:0.20, type:"sawtooth", volume:0.07, delay:i * 0.12}));
    },
    reveal(){ playTone({freq:340, duration:0.20, type:"sine", volume:0.06}); }
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
  const hintCost = document.getElementById("hintCost");
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

  function costOfHint(index){
    return HINT_COSTS[index] !== undefined ? HINT_COSTS[index] : HINT_COSTS[HINT_COSTS.length - 1];
  }

  function currentPoints(){
    let cost = 0;
    for(let i = 0; i < hintsUsed; i++) cost += costOfHint(i);
    return Math.max(BASE_POINTS - cost - missPenalty, 0);
  }

  function updateHintCost(){
    const nextCost = costOfHint(hintsUsed);
    hintCost.textContent = nextCost === 0 ? "grátis" : `\u2212${nextCost}`;
    hintCost.classList.toggle("paid", nextCost > 0);
  }

  function updateRing(){
    const pct = currentPoints() / BASE_POINTS;
    const offset = RING_CIRC * (1 - pct);
    ringValue.setAttribute("stroke-dashoffset", offset.toFixed(2));
    ringValue.style.stroke = pct > 0.55 ? "#f4c531" : (pct > 0.25 ? "#e8934a" : "#e15a4c");
  }

  function pickPlayer(){
    if(pool.length === 0) pool = shuffle([...players]);
    return pool.pop();
  }

  function startRound(){
    hintsUsed = 0;
    remainingHints = shuffle([...HINT_POOL]);
    cardsOpen = false;
    roundOver = false;
    missPenalty = 0;

    pointsValue.textContent = currentPoints();
    updateRing();
    updateHintCost();
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
    openHintCards();
  }

  function openHintCards(){
    cardsOpen = true;
    hintBtn.classList.add("hidden");
    feedback.textContent = "Escolha uma carta para revelar uma dica aleatória.";
    feedback.className = "info";
    sfx.hintOpen();

    const count = Math.min(3, remainingHints.length);
    const offered = shuffle([...remainingHints]).slice(0, count);

    hintCards.innerHTML = "";
    offered.forEach(hint => {
      const card = document.createElement("div");
      card.className = "hint-card";
      card.innerHTML = `
        <div class="hint-card-inner">
          <div class="hint-card-face hint-card-back">?</div>
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

  function pickHintCard(cardEl, hint){
    if(!cardsOpen) return;
    cardsOpen = false;
    sfx.hintPick();

    cardEl.classList.add("flipped", "picked");
    cardEl.querySelector(".tag").textContent = hint.label;
    cardEl.querySelector(".val").textContent = current[hint.key];
    [...hintCards.children].forEach(c => { if(c !== cardEl) c.classList.add("discarded"); });

    remainingHints = remainingHints.filter(h => h.key !== hint.key);
    hintsUsed++;
    pointsValue.textContent = currentPoints();
    updateRing();

    setTimeout(() => {
      if(roundOver) return;
      revealClue(hint.key, hint.label, current[hint.key]);
      hintOverlay.classList.remove("show");
      document.body.classList.remove("no-scroll");
      hintCards.innerHTML = "";
      hintBtn.classList.remove("hidden");
      updateHintCost();
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
      finishRound(true);
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

  function finishRound(won){
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
  answerCloseBtn.addEventListener("click", closeAnswerOverlay);
  answerOverlay.addEventListener("click", e => {
    if(e.target === answerOverlay) closeAnswerOverlay();
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

  current = pickPlayer();
  jerseyTrack.appendChild(makeJerseySlot(current.numero));
  startRound();
})();
