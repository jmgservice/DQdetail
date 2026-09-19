/* =========================================================
   DQ DETAIL AI — Atendente Virtual da Dellazari & Quadros
   100% baseado em regras/motor local, sem custo de API.
   Base de conhecimento oficial preenchida com dados reais do site.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- BASE DE CONHECIMENTO OFICIAL (não inventar nada fora daqui) ---------- */
  var KB = {
    nome: "Dellazari & Quadros — DQ Detail",
    cidade: "Carazinho, RS",
    endereco: "Rua Alfredo Scherer, 125 — Bairro Ouro Preto, Carazinho, RS",
    whatsappJoao: "5554994062662",
    whatsappFelipe: "5554999644181",
    whatsappDisplay: "(54) 99406-2662",
    instagramUrl: "https://www.instagram.com/dq_autodetail/",
    instagramHandle: "@dq_autodetail",
    horario: "Segunda a sábado, das 8h às 18h",
    pagamento: "Pix — usado hoje como adiantamento para confirmar o horário quando o agendamento é feito direto pelo site. Para outras formas de pagamento no dia do serviço, o ideal é confirmar com a equipe pelo WhatsApp.",
    diferenciais: "Padrão técnico rigoroso em cada etapa, produtos de alta performance e atenção a cada detalhe da pintura, do interior e do acabamento. Atendemos carros, motos e caminhões em Carazinho e região.",
    socios: [
      { nome: "João Gabriel Delazzari", area: "pintura e acabamento estético", whatsapp: "5554994062662" },
      { nome: "Felipe Quadros", area: "detalhamento, vitrificação cerâmica e higienização interna", whatsapp: "5554999644181" }
    ],
    servicos: {
      carro: [
        { nome: "Lavagem Nível 1", preco: "R$ 75 (camioneta R$ 130)", desc: "Limpeza tradicional e rápida, com técnicas seguras e produtos neutros para manter todas as superfícies impecáveis." },
        { nome: "Lavagem Nível 2 (Detalhada)", preco: "R$ 250 (camioneta R$ 350)", desc: "Higienização e lavagem minuciosa, com aplicação de cera de proteção de alto rendimento e revitalização completa dos plásticos internos e externos." },
        { nome: "Polimento Técnico", preco: "a partir de R$ 400 (camioneta a partir de R$ 600)", desc: "Correção de pintura em etapas, removendo riscos e marcas de oxidação para recuperar o brilho original." },
        { nome: "Higienização Interna Completa", preco: "sob avaliação presencial", desc: "Limpeza profunda de estofados, carpetes e forros em couro ou tecido, com sanitização completa do habitáculo." },
        { nome: "Lavagem Técnica de Motor", preco: "a partir de R$ 80 (camioneta a partir de R$ 120)", desc: "Limpeza segura do compartimento do motor, removendo graxa e sujeira sem risco aos componentes elétricos." },
        { nome: "Lavagem Técnica de Chassi", preco: "a partir de R$ 120 (camioneta a partir de R$ 200)", desc: "Remoção de lama, sal e resíduos da parte inferior do veículo, prevenindo corrosão e desgaste." },
        { nome: "Polimento de Faróis (Par)", preco: "R$ 100 (carro e camioneta)", desc: "Remoção da opacidade e do amarelamento das lentes, recuperando transparência e alcance da iluminação." },
        { nome: "Remoção de Chuva Ácida (Vidros)", preco: "a partir de R$ 80 (carro e camioneta)", desc: "Tratamento técnico para eliminar manchas de chuva ácida e restaurar a transparência dos vidros." },
        { nome: "Espelhamento de Pintura", preco: "a partir de R$ 800 (camioneta a partir de R$ 1.000)", desc: "Acabamento de altíssimo padrão que leva o brilho da pintura ao nível máximo, com efeito espelhado." }
      ],
      moto: [
        { nome: "Lavagem Nível 1", preco: "R$ 55", desc: "Lavagem de entrada, ágil e com ótimo custo-benefício, com cuidado para a conservação e o brilho da moto." },
        { nome: "Lavagem Nível 2", preco: "R$ 80", desc: "Limpeza minuciosa detalhe por detalhe, com aplicação de verniz de motor e cera de alta proteção." },
        { nome: "Lavagem Nível 3 (Detalhada)", preco: "R$ 350", desc: "Desmontagem cuidadosa das carenagens, banco e placa para lavagem profunda, com revitalização de plásticos e hidratação do banco." },
        { nome: "Polimento de Pintura", preco: "R$ 150", desc: "Correção de pintura para remover riscos leves e recuperar o brilho original." },
        { nome: "Vitrificação de Pintura", preco: "R$ 300", desc: "Proteção cerâmica de longa duração para pintura, plásticos e peças metálicas." },
        { nome: "Descontaminação Ferrosa Completa", preco: "R$ 150", desc: "Remoção de partículas ferrosas incrustadas na pintura, deixando a superfície lisa." },
        { nome: "Polimento de Escapamento", preco: "R$ 200", desc: "Polimento técnico que devolve o brilho original às peças metálicas do escapamento." },
        { nome: "Pintura de Escapamento", preco: "R$ 180", desc: "Repintura de alta resistência térmica para escapamentos desgastados ou danificados." },
        { nome: "Espelhamento de Pintura", preco: "a partir de R$ 800", desc: "Acabamento premium que leva o brilho da pintura ao nível máximo, com efeito espelhado." }
      ],
      caminhao: [
        { nome: "Lavagem e Estética de Caminhões", preco: "sob consulta", desc: "Estrutura completa para frotas e caminhões, de lavagens operacionais ao detalhamento estético completo." },
        { nome: "Higienização Interna Completa de Cabine", preco: "sob consulta", desc: "Limpeza profunda de bancos, forros e painel da cabine, com sanitização do ambiente do motorista." },
        { nome: "Vitrificação & Proteção de Pintura", preco: "sob consulta", desc: "Proteção cerâmica de longa duração para a pintura da cabine, mantendo o brilho e facilitando a manutenção." },
        { nome: "Polimento Técnico de Cabine e Alumínios", preco: "sob consulta", desc: "Correção de pintura da cabine e polimento das peças de alumínio, recuperando o brilho original." },
        { nome: "Remoção de Chuva Ácida dos Vidros", preco: "sob consulta", desc: "Tratamento técnico para eliminar manchas de chuva ácida da cabine." },
        { nome: "Polimento e Restauração de Faróis", preco: "sob consulta", desc: "Remoção da opacidade e amarelamento das lentes, recuperando transparência e alcance da iluminação." }
      ]
    }
  };

  function waLink(numero, texto) {
    return "https://wa.me/" + numero + (texto ? "?text=" + encodeURIComponent(texto) : "");
  }

  /* ---------- ESTADO DA CONVERSA (memória simples de sessão) ---------- */
  var state = {
    nomeCliente: null,
    veiculoTipo: null,   // carro | moto | caminhao
    veiculoModelo: null,
    veiculoAno: null,
    servicoInteresse: null,
    aguardandoModelo: false,
    irritado: false
  };

  /* ---------- UTILIDADES DE TEXTO ---------- */
  function normalizar(txt) {
    return txt
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function contemAlguma(texto, lista) {
    for (var i = 0; i < lista.length; i++) {
      if (texto.indexOf(lista[i]) !== -1) return true;
    }
    return false;
  }

  /* ---------- FORMATAÇÃO DE RESPOSTAS DE SERVIÇO ---------- */
  function formatarServico(grupo, s) {
    var nomeGrupo = grupo === "carro" ? "" : grupo === "moto" ? " (moto)" : " (caminhão)";
    return "**" + s.nome + nomeGrupo + "**\n" + s.desc + "\nValor: " + s.preco;
  }

  function buscarServicoPorPalavra(palavra) {
    var grupos = ["carro", "moto", "caminhao"];
    var achados = [];
    for (var g = 0; g < grupos.length; g++) {
      var lista = KB.servicos[grupos[g]];
      for (var i = 0; i < lista.length; i++) {
        var alvo = normalizar(lista[i].nome);
        if (alvo.indexOf(palavra) !== -1) {
          achados.push({ grupo: grupos[g], s: lista[i] });
        }
      }
    }
    return achados;
  }

  /* ---------- VARIAÇÕES DE FRASES (evitar repetição) ---------- */
  var aberturas = [
    "Boa! ",
    "Perfeito. ",
    "Show! ",
    "Entendi. ",
    "",
    "Certo! "
  ];
  function abertura() {
    return aberturas[Math.floor(Math.random() * aberturas.length)];
  }

  /* ---------- MOTOR DE RESPOSTAS ---------- */
  function responder(msgOriginal) {
    var t = normalizar(msgOriginal);

    // Captura passiva de veículo (ex: "tenho um corolla 2022")
    var anoMatch = msgOriginal.match(/\b(19|20)\d{2}\b/);
    if (anoMatch) state.veiculoAno = anoMatch[0];
    if (/\b(corolla|civic|hb20|onix|gol|polo|kwid|argo|cronos|compass|renegade|tracker|hilux|amarok|s10|ranger|saveiro|strada|moto|kawasaki|z400|cb|fazer|xre|caminh[aã]o)\b/.test(t)) {
      var m = msgOriginal.match(/\b[A-Za-zÀ-ÿ0-9]+\b/g);
      // guarda o texto cru como "modelo" de forma simples (não crítico)
      if (!state.veiculoModelo) state.veiculoModelo = msgOriginal.trim();
    }

    // 1) Cliente irritado / insatisfeito
    if (contemAlguma(t, ["pessimo", "horrivel", "reclamacao", "absurdo", "indignado", "nunca mais", "estao de brincadeira", "descaso", "furada"])) {
      state.irritado = true;
      return "Entendo, e sinto muito pelo transtorno. Nesse caso, o melhor caminho é falar direto com a equipe da DQ Detail pelo WhatsApp, para que possam entender a situação com calma e resolver da melhor forma.\n\n[💬 Falar no WhatsApp](" + waLink(KB.whatsappJoao, "Olá, preciso falar sobre um problema com um serviço da DQ Detail.") + ")";
    }

    // 2) Saudações (incluindo perguntas de hora do dia)
    if (contemAlguma(t, ["bom dia", "boa tarde", "boa noite", "ola", "oi", "opa", "eae", "e ai"]) && t.length < 40) {
      return abertura() + "Sou o atendente virtual da DQ Detail 🚗✨ Posso te ajudar com serviços, orçamento, horários e agendamento. Como posso ajudar?";
    }
    if (contemAlguma(t, ["que dia e hoje", "que horas", "hora atual"])) {
      var agora = new Date();
      return "Aqui no meu relógio agora é " + agora.toLocaleDateString("pt-BR") + ", " + agora.toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"}) + ". Nosso horário de atendimento é " + KB.horario + ".";
    }

    // 3) Endereço / localização
    if (contemAlguma(t, ["onde voces ficam", "endereco", "localizacao", "como chegar", "onde fica", "onde e"])) {
      return "Estamos na " + KB.endereco + ". [📍 Como chegar](https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(KB.endereco) + ")";
    }

    // 4) WhatsApp / contato
    if (contemAlguma(t, ["whatsapp", "numero", "telefone", "zap"])) {
      return "Nosso WhatsApp é " + KB.whatsappDisplay + ". [💬 Falar no WhatsApp](" + waLink(KB.whatsappJoao) + ")";
    }

    // 5) Instagram
    if (contemAlguma(t, ["instagram", "insta", "rede social"])) {
      return "Nosso Instagram é " + KB.instagramHandle + ": " + KB.instagramUrl;
    }

    // 6) Horário de atendimento
    if (contemAlguma(t, ["horario", "atendem sabado", "abre que hora", "fecha que hora", "domingo", "atende hoje"])) {
      return "Atendemos de " + KB.horario + ".";
    }

    // 7) Formas de pagamento
    if (contemAlguma(t, ["forma de pagamento", "pagamento", "pix", "cartao", "parcela"])) {
      return KB.pagamento;
    }

    // 8) Diferenciais / sobre a empresa
    if (contemAlguma(t, ["quem sao voces", "sobre a", "diferencial", "historia da"])) {
      return KB.diferenciais;
    }

    // 9) Comparações (polimento vs vitrificação/cristalização, etc.)
    if (contemAlguma(t, ["polimento ou vitrifica", "vitrifica ou polimento", "melhor polimento ou", "diferenca entre polimento e"])) {
      return "Depende do que você quer melhorar no veículo.\n\nO **polimento** é voltado para correção e recuperação da pintura (remove riscos e marcas de oxidação, devolvendo o brilho).\n\nA **vitrificação** foca em proteção e manutenção da superfície já corrigida.\n\nEm muitos casos, os dois fazem parte do mesmo processo: primeiro corrige, depois protege.";
    }

    // 10) Pedido de orçamento/preço genérico (antes de checar serviço específico)
    var pedeOrcamento = contemAlguma(t, ["quanto custa", "qual o valor", "quanto fica", "preco", "orcamento", "valor do", "quanto e"]);

    // 11) Busca por serviço específico (usa sinônimos naturais do cliente)
    var sinonimos = [
      { chave: "lavagem", termos: ["lavagem", "lavar o carro", "lavar a moto", "lavagem simples", "lavagem detalhada"] },
      { chave: "polimento", termos: ["polimento", "risco", "riscado", "pintura queimada", "sem brilho", "opaco"] },
      { chave: "vitrificacao", termos: ["vitrificacao", "vitrifica", "cristalizacao", "cristaliza", "aquele negocio que protege a pintura", "protecao de pintura", "protege a pintura"] },
      { chave: "higieniz", termos: ["higienizacao", "higienizar", "limpeza interna", "limpar banco", "lavar banco", "limpar estofado", "limpeza de estofado"] },
      { chave: "farol", termos: ["farol", "farois", "lente do farol", "farol amarelado", "farol opaco"] },
      { chave: "chuva acida", termos: ["chuva acida", "mancha no vidro", "vidro manchado"] },
      { chave: "espelhamento", termos: ["espelhamento", "brilho maximo", "efeito espelhado"] },
      { chave: "motor", termos: ["lavagem de motor", "limpar o motor", "motor sujo"] },
      { chave: "chassi", termos: ["chassi", "parte de baixo do carro", "lavagem de chassi"] },
      { chave: "escapamento", termos: ["escapamento", "escape da moto", "ponteira"] },
      { chave: "descontamina", termos: ["descontaminacao", "ferrugem na pintura", "pontinhos de ferrugem"] }
    ];

    var chaveEncontrada = null;
    for (var i = 0; i < sinonimos.length; i++) {
      if (contemAlguma(t, sinonimos[i].termos)) { chaveEncontrada = sinonimos[i].chave; break; }
    }

    if (chaveEncontrada) {
      var achados = buscarServicoPorPalavra(chaveEncontrada === "vitrificacao" ? "vitrific" : chaveEncontrada === "higieniz" ? "higieniz" : chaveEncontrada === "descontamina" ? "descontamina" : chaveEncontrada);
      // fallback: tenta achar por chave direta caso a busca por nome não bata
      if (achados.length === 0) {
        var mapaDireto = {
          lavagem: "lavagem",
          polimento: "polimento",
          farol: "farol",
          "chuva acida": "chuva acida",
          espelhamento: "espelhamento",
          motor: "motor",
          chassi: "chassi",
          escapamento: "escapamento"
        };
        var termoBusca = mapaDireto[chaveEncontrada];
        if (termoBusca) achados = buscarServicoPorPalavra(termoBusca);
      }

      if (achados.length > 0) {
        // Se sabemos o tipo de veículo do cliente, prioriza aquele grupo
        var filtrados = achados;
        if (state.veiculoTipo) {
          var doTipo = achados.filter(function (a) { return a.grupo === state.veiculoTipo; });
          if (doTipo.length > 0) filtrados = doTipo;
        }

        var texto = abertura();
        if (chaveEncontrada === "vitrificacao") {
          texto += "Sim, trabalhamos com vitrificação! É um tratamento de proteção que cria uma camada sobre a pintura, ajudando contra contaminantes, facilitando a manutenção e dando bastante brilho.\n\n";
        } else if (chaveEncontrada === "polimento") {
          texto += "Sim, fazemos polimento técnico! Ele corrige a pintura em etapas, removendo riscos e marcas de oxidação para recuperar o brilho original.\n\n";
        } else if (chaveEncontrada === "higieniz") {
          texto += "Sim, fazemos higienização interna completa — limpeza profunda de estofados, carpetes e forros, com sanitização do habitáculo.\n\n";
        }

        var listaTexto = filtrados.slice(0, 4).map(function (a) { return formatarServico(a.grupo, a.s); }).join("\n\n");
        texto += listaTexto;

        if (pedeOrcamento && chaveEncontrada !== "lavagem") {
          texto += "\n\nO valor pode variar conforme o tamanho e o estado do veículo. Se quiser, me diga o modelo e o ano do seu carro/moto que consigo te orientar melhor, e depois posso te encaminhar para o WhatsApp para confirmar o orçamento.";
          state.aguardandoModelo = true;
        } else {
          texto += "\n\nSe quiser, posso te encaminhar para o WhatsApp para agendar ou tirar mais dúvidas. [💬 Falar no WhatsApp](" + waLink(KB.whatsappJoao) + ")";
        }
        return texto;
      }
    }

    // 12) Orçamento genérico sem serviço identificado
    if (pedeOrcamento) {
      if (state.veiculoModelo && state.servicoInteresse) {
        return "Perfeito. Com essas informações já conseguimos encaminhar uma avaliação. Posso te direcionar para o WhatsApp da DQ Detail. [💬 Falar no WhatsApp](" + waLink(KB.whatsappJoao, "Olá! Gostaria de um orçamento na Dellazari & Quadros para " + state.veiculoModelo + ".") + ")";
      }
      state.aguardandoModelo = true;
      return "O valor pode variar conforme o tamanho e o estado do veículo. Para te orientar melhor, qual é o serviço que você tem em mente e o modelo/ano do veículo?";
    }

    // 13) Captura de modelo/serviço quando estávamos aguardando
    if (state.aguardandoModelo && (t.length > 2)) {
      state.veiculoModelo = state.veiculoModelo || msgOriginal.trim();
      state.aguardandoModelo = false;
      return "Perfeito. Com essas informações já conseguimos encaminhar uma avaliação/orçamento. Posso te direcionar para o WhatsApp da DQ Detail. [💬 Falar no WhatsApp](" + waLink(KB.whatsappJoao, "Olá! Gostaria de um orçamento na Dellazari & Quadros. Veículo/serviço: " + msgOriginal.trim()) + ")";
    }

    // 14) Intenção de agendamento
    if (contemAlguma(t, ["agendar", "quero fazer amanha", "tem horario", "como agendo", "marcar horario", "quero fazer hoje", "posso levar hoje"])) {
      return abertura() + "🚗 Para verificar disponibilidade e confirmar o horário, o ideal é falar direto com a equipe pelo WhatsApp. [📅 Solicitar agendamento](" + waLink(KB.whatsappJoao, "Olá! Quero agendar um horário na Dellazari & Quadros.") + ")";
    }

    // 15) Quais carros/motos atendem
    if (contemAlguma(t, ["quais carros", "atende suv", "atende caminhonete", "pegam carros muito sujos", "atendem moto", "atendem caminhao"])) {
      return "Atendemos carros, motos e caminhões — de hatches e sedãs a SUVs e camionetes, sem restrição quanto ao nível de sujeira. Cada caso é avaliado para indicar o serviço mais adequado.";
    }

    // 16) Dúvidas conceituais gerais tipo "o que é X"
    if (/\bo que e\b/.test(t)) {
      var todos = ["vitrific", "polimento", "higieniz", "espelhamento", "descontamina"];
      for (var k = 0; k < todos.length; k++) {
        if (t.indexOf(todos[k]) !== -1) {
          var r = buscarServicoPorPalavra(todos[k]);
          if (r.length) return formatarServico(r[0].grupo, r[0].s) + "\n\nSe quiser, posso te explicar como funciona o processo na prática.";
        }
      }
    }

    // 17) Despedida
    if (contemAlguma(t, ["tchau", "obrigado", "obrigada", "valeu", "ate mais", "flw"])) {
      return "Foi um prazer ajudar! Qualquer dúvida, estou por aqui. 🚗✨";
    }

    // 18) Fora do assunto
    if (contemAlguma(t, ["jogo", "futebol", "politica", "clima", "piada", "receita"])) {
      return "Posso te ajudar com informações sobre a DQ Detail, nossos serviços, orçamento e agendamento. 🚗";
    }

    // 19) Fallback — nunca inventar
    return "Essa informação eu não tenho disponível aqui, mas posso te encaminhar para o atendimento da DQ Detail pelo WhatsApp para confirmar. [💬 Falar no WhatsApp](" + waLink(KB.whatsappJoao) + ")";
  }

  /* ---------- RENDERIZAÇÃO DO MARKDOWN SIMPLES ---------- */
  function renderMini(texto) {
    var html = texto
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n/g, "<br>");
    return html;
  }

  /* ---------- WIDGET (UI) ---------- */
  var css = "\n" +
    "#dqai-btn{position:fixed;bottom:22px;right:22px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#D4B06A,#B8914E 55%,#8C6C39);box-shadow:0 10px 30px -8px rgba(184,145,78,.65);border:none;cursor:pointer;z-index:99998;display:flex;align-items:center;justify-content:center;transition:transform .25s ease;}\n" +
    "#dqai-btn:hover{transform:scale(1.06);}\n" +
    "#dqai-btn svg{width:28px;height:28px;color:#08090A;}\n" +
    "#dqai-panel{position:fixed;bottom:96px;right:22px;width:340px;max-width:92vw;height:480px;max-height:74vh;background:#0F0E0C;border:1px solid rgba(184,145,78,.35);border-radius:14px;box-shadow:0 24px 60px -12px rgba(0,0,0,.6);display:none;flex-direction:column;overflow:hidden;z-index:99999;font-family:'Manrope',Arial,sans-serif;}\n" +
    "#dqai-panel.is-open{display:flex;}\n" +
    "#dqai-head{background:linear-gradient(135deg,#171717,#08090A);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(184,145,78,.25);}\n" +
    "#dqai-head strong{color:#D4B06A;font-size:.92rem;letter-spacing:.02em;}\n" +
    "#dqai-head span{color:rgba(232,229,223,.5);font-size:.72rem;display:block;margin-top:2px;}\n" +
    "#dqai-close{background:none;border:none;color:rgba(232,229,223,.6);font-size:1.1rem;cursor:pointer;line-height:1;padding:4px;}\n" +
    "#dqai-close:hover{color:#D4B06A;}\n" +
    "#dqai-body{flex:1;overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:10px;background:#0B0A09;}\n" +
    "#dqai-body::-webkit-scrollbar{width:6px;}#dqai-body::-webkit-scrollbar-thumb{background:rgba(184,145,78,.35);border-radius:3px;}\n" +
    ".dqai-msg{max-width:86%;font-size:.83rem;line-height:1.5;padding:9px 12px;border-radius:10px;color:#E8E5DF;}\n" +
    ".dqai-msg a{color:#D4B06A;text-decoration:underline;}\n" +
    ".dqai-msg.bot{align-self:flex-start;background:#1F1E1C;border:1px solid rgba(184,145,78,.18);border-bottom-left-radius:2px;}\n" +
    ".dqai-msg.user{align-self:flex-end;background:linear-gradient(135deg,#D4B06A,#B8914E);color:#08090A;border-bottom-right-radius:2px;font-weight:600;}\n" +
    "#dqai-quick{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px;}\n" +
    ".dqai-chip{background:transparent;border:1px solid rgba(184,145,78,.4);color:#D4B06A;font-size:.7rem;padding:6px 10px;border-radius:20px;cursor:pointer;white-space:nowrap;}\n" +
    ".dqai-chip:hover{background:rgba(184,145,78,.12);}\n" +
    "#dqai-inputwrap{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(184,145,78,.2);background:#0F0E0C;}\n" +
    "#dqai-input{flex:1;background:#171717;border:1px solid rgba(184,145,78,.25);border-radius:20px;padding:9px 14px;color:#E8E5DF;font-size:.82rem;outline:none;}\n" +
    "#dqai-input::placeholder{color:rgba(232,229,223,.4);}\n" +
    "#dqai-send{background:linear-gradient(135deg,#D4B06A,#B8914E);border:none;border-radius:50%;width:36px;height:36px;flex:none;cursor:pointer;display:flex;align-items:center;justify-content:center;}\n" +
    "#dqai-send svg{width:16px;height:16px;color:#08090A;}\n" +
    "@media (max-width:480px){#dqai-panel{right:12px;bottom:88px;width:calc(100vw - 24px);}#dqai-btn{right:14px;bottom:14px;}}\n";

  function injectCss() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildUI() {
    var btn = document.createElement("button");
    btn.id = "dqai-btn";
    btn.setAttribute("aria-label", "Abrir atendente virtual DQ Detail");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>';

    var panel = document.createElement("div");
    panel.id = "dqai-panel";
    panel.innerHTML =
      '<div id="dqai-head"><div><strong>DQ Detail — Atendimento</strong><span>Normalmente responde em minutos</span></div><button id="dqai-close" aria-label="Fechar">✕</button></div>' +
      '<div id="dqai-body"></div>' +
      '<div id="dqai-quick"></div>' +
      '<div id="dqai-inputwrap"><input id="dqai-input" type="text" placeholder="Digite sua mensagem..."><button id="dqai-send" aria-label="Enviar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var body = panel.querySelector("#dqai-body");
    var quick = panel.querySelector("#dqai-quick");
    var input = panel.querySelector("#dqai-input");

    function addMsg(texto, quem) {
      var div = document.createElement("div");
      div.className = "dqai-msg " + quem;
      div.innerHTML = quem === "bot" ? renderMini(texto) : texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function chips(lista) {
      quick.innerHTML = "";
      lista.forEach(function (c) {
        var b = document.createElement("button");
        b.className = "dqai-chip";
        b.textContent = c.label;
        b.onclick = function () {
          if (c.href) { window.open(c.href, "_blank"); return; }
          input.value = c.value;
          send();
        };
        quick.appendChild(b);
      });
    }

    function send() {
      var v = input.value.trim();
      if (!v) return;
      addMsg(v, "user");
      input.value = "";
      setTimeout(function () {
        var r = responder(v);
        addMsg(r, "bot");
      }, 280);
    }

    panel.querySelector("#dqai-send").onclick = send;
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
    panel.querySelector("#dqai-close").onclick = function () { panel.classList.remove("is-open"); };
    btn.onclick = function () {
      panel.classList.toggle("is-open");
      if (panel.classList.contains("is-open") && body.children.length === 0) {
        addMsg("Olá! 👋 Sou o atendente virtual da " + KB.nome + ". Posso te ajudar com serviços, valores, horários e agendamento. Como posso ajudar?", "bot");
        chips([
          { label: "💬 WhatsApp", href: waLink(KB.whatsappJoao) },
          { label: "🚗 Ver serviços", value: "quais serviços vocês fazem" },
          { label: "💰 Orçamento", value: "quanto custa" },
          { label: "📍 Como chegar", value: "onde vocês ficam" }
        ]);
      }
    };
  }

  function init() {
    injectCss();
    buildUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
