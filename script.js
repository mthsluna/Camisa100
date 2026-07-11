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
  const HINT_COST = 15;
  const BASE_POINTS = 100;
  const HINT_ORDER = [
    {key:"posicao", label:"Posição"},
    {key:"apelido", label:"Apelido"},
    {key:"time", label:"Clube marcante"},
    {key:"estado", label:"Estado natal"},
    {key:"decada", label:"Época"},
    {key:"titulo", label:"Título marcante"}
  ];

  let pool = shuffle([...players]);
  let current = null;
  let hintsUsed = 0;
  let totalScore = 0;
  let round = 1;
  let hits = 0;
  let roundOver = false;

  // ---------- dom ----------
  const numberDisplay = document.getElementById("numberDisplay");
  const pointsValue = document.getElementById("pointsValue");
  const ringValue = document.getElementById("ringValue");
  const cluesList = document.getElementById("cluesList");
  const hintBtn = document.getElementById("hintBtn");
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const revealBtn = document.getElementById("revealBtn");
  const nextBtn = document.getElementById("nextBtn");
  const feedback = document.getElementById("feedback");
  const revealCard = document.getElementById("revealCard");
  const totalScoreEl = document.getElementById("totalScore");
  const roundNumEl = document.getElementById("roundNum");
  const hitCountEl = document.getElementById("hitCount");
  const playersList = document.getElementById("playersList");

  const RING_CIRC = 2 * Math.PI * 98;
  ringValue.setAttribute("stroke-dasharray", RING_CIRC.toFixed(2));

  playersList.innerHTML = players.map(p => `<option value="${p.nome}">`).join("");

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
    return Math.max(BASE_POINTS - hintsUsed * HINT_COST, 10);
  }

  function updateRing(){
    const pct = currentPoints() / BASE_POINTS;
    const offset = RING_CIRC * (1 - pct);
    ringValue.setAttribute("stroke-dashoffset", offset.toFixed(2));
    ringValue.style.stroke = pct > 0.55 ? "#f4c531" : (pct > 0.25 ? "#e8934a" : "#e15a4c");
  }

  function startRound(){
    if(pool.length === 0) pool = shuffle([...players]);
    current = pool.pop();
    hintsUsed = 0;
    roundOver = false;

    numberDisplay.textContent = current.numero;
    pointsValue.textContent = currentPoints();
    updateRing();
    cluesList.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "info";
    revealCard.classList.remove("show");
    revealCard.innerHTML = "";
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    hintBtn.disabled = false;
    revealBtn.disabled = false;
    nextBtn.disabled = true;
    roundNumEl.textContent = round;
    guessInput.focus();
  }

  function addClue(label, value){
    const li = document.createElement("li");
    li.innerHTML = `<span class="tag">${label}</span><span>${value}</span>`;
    cluesList.appendChild(li);
  }

  function giveHint(){
    if(roundOver) return;
    if(hintsUsed >= HINT_ORDER.length){
      feedback.textContent = "Todas as dicas já foram reveladas.";
      feedback.className = "info";
      return;
    }
    const hint = HINT_ORDER[hintsUsed];
    addClue(hint.label, current[hint.key]);
    hintsUsed++;
    pointsValue.textContent = currentPoints();
    updateRing();
    feedback.textContent = `Dica revelada. Rodada agora vale ${currentPoints()} pontos.`;
    feedback.className = "info";
    if(hintsUsed >= HINT_ORDER.length) hintBtn.disabled = true;
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
      totalScoreEl.textContent = totalScore;
      hitCountEl.textContent = hits;
      feedback.textContent = `Isso aí! +${pts} pontos.`;
      feedback.className = "good";
      finishRound(true);
    } else {
      feedback.textContent = "Não foi essa. Tente de novo ou peça uma dica.";
      feedback.className = "bad";
      setTimeout(() => feedback.classList.remove("bad"), 300);
    }
  }

  function finishRound(won){
    roundOver = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    revealBtn.disabled = true;
    nextBtn.disabled = false;

    revealCard.classList.add("show");
    revealCard.innerHTML = `
      <b>${current.nome}</b> — camisa ${current.numero}, ${current.posicao}<br>
      Apelido: ${current.apelido} · Clube marcante: ${current.time}<br>
      Naturalidade: ${current.estado} · Época: ${current.decada}<br>
      Destaque: ${current.titulo}
    `;

    if(!won){
      feedback.textContent = `Resposta revelada: ${current.nome}. Rodada sem pontos.`;
      feedback.className = "info";
    }
  }

  hintBtn.addEventListener("click", giveHint);
  guessBtn.addEventListener("click", checkGuess);
  guessInput.addEventListener("keydown", e => { if(e.key === "Enter") checkGuess(); });
  revealBtn.addEventListener("click", () => finishRound(false));
  nextBtn.addEventListener("click", () => { round++; startRound(); });

  startRound();
})();
