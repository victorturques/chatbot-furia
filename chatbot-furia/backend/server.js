const express = require('express'); // Importa o Express
const cors = require('cors');
const app = express(); // Inicializa o servidor Express
const PORT = 5000; // Define a porta do servidor

app.use(cors());
app.use(express.json()); // Middleware para processar JSON no corpo da requisição

// Informações sobre a FURIA Esports
const furiaInfo = {
  time: {
    pais: "Brasil",
    rankingValve: 18,
    rankingHltv: 17,
    tecnico: "Sid 'sidde' Macedo",
    twitter: "https://x.com/FURIA",
    twitch: "https://www.twitch.tv/furiatv",
    intagram: "https://www.instagram.com/furiagg",
    site: "https://www.furia.gg",
    camisa: "https://www.furia.gg/produto/camiseta-furia-oficial-24-preta-150177",
  },
  jogadores: [
    { nome: "FalleN", pais: "Brasil", idade: 33, },
    { nome: "yuurih", pais: "Brasil", idade: 25 },
    { nome: "YEKINDAR", pais: "Letônia", idade: 25 },
    { nome: "KSCERATO", pais: "Brasil", idade: 25 },
    { nome: "molodoy", pais: "Cazaquistão", idade: 20},
  ],
  
  conquistas: [
    "Campeões da DreamHack Masters Spring 2020 - North America",
    "Campeões da IEM New York 2020 North America",
    "Campeões da ESL Pro League Season 12 - América do Norte",
    "Primeiro lugar na Elisa Masters Espoo 2023",
    "Vice-campeões do IEM Katowice 2023",
    "Top 4 no Major de CS:GO 2022"
  ],

  Mapas: [
    {mapa: "Mirage", vitoria: 25, derrotas: 28, vitoriaPorcentagem: "47.2%", pickPorcentagem: "25%", banPorcentagem: "19%"},
    {mapa: "Nuke", vitoria: 27, derrotas: 22, vitoriaPorcentagem: "55.1%", pickPorcentagem: "35.7%", banPorcentagem: "15.8%"},
    {mapa: "Inferno", vitoria: 19, derrotas: 17, vitoriaPorcentagem: "52.8%", pickPorcentagem: "10.4%", banPorcentagem: "19.6%"}, 
    {mapa: "Dust2", vitoria: 21, derrotas: 13, vitoriaPorcentagem: "61.8%", pickPorcentagem: "35.6%", banPorcentagem: "12.8%"},
    {mapa: "Ancient", vitoria: 14, derrotas: 14, vitoriaPorcentagem: "50%", pickPorcentagem: "18.2%", banPorcentagem: "51.1%"},
    {mapa: "Vertigo", vitoria: 13, derrotas: 13, vitoriaPorcentagem: "50%", pickPorcentagem: "16.3%", banPorcentagem: "18.8%"},
    {mapa: "Anubis", vitoria: 9, derrotas: 12, vitoriaPorcentagem: "42.9%", pickPorcentagem: "10.3%", banPorcentagem: "61.6%"},
    {mapa: "Overpass", vitoria: 6, derrotas: 6, vitoriaPorcentagem: "50%", pickPorcentagem: "22.6%", banPorcentagem: "16.7%"},
    {mapa: "Train", vitoria: 3, derrotas: 3, vitoriaPorcentagem: "50%", pickPorcentagem: "18.8%", banPorcentagem: "16%"},
  ],
  Campeonatos: {
    proximos: [
      { campeonato: "PGL Astana 2025", data: "10 de maio a 18 de maio", local: "Astana, Cazaquistão" },
      { campeonato: "IEM Dallas 2025", data: "19 de maio a 25 de maio", local: "Dallas, Estados Unidos" },
      { campeonato: "BLAST.tv Austin Major 2025 Stage 2", data: "7 de junho a 10 de junho", local: "Austin, Estados Unidos" },
    ], 
    ultimos: [
      { campeonato: "PGL Bucareste 2025", data: "6 de abril a 13 de abril", local: "Bucareste, Romênia", resultado: "12-14th" },
      { campeonato: "BLAST Open Lisbon 2025", data: "19 de março a 30 de março", local: "Lisboa, Portugal", resultado: "13-16th" }, 
      { campeonato: "ESL Pro League Season 21", data: "7 de março a 16 de março", local: "Stockholm, Suécia", resultado: "12-14th" },

    ]
  }, 
  
};

// Função para normalizar o texto do usuário (remover acentos, caracteres especiais e converter para minúsculas)
function normalizeText(text) {
  return text
    .normalize('NFD') // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos (acentos)
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remover caracteres especiais
    .toLowerCase(); // Converter para letras minúsculas
}

// Rota para processar mensagens do usuário e retornar respostas do bot
app.post('/api/chat', (req, res) => {
  const userMessage = normalizeText(req.body.message);// Normaliza a mensagem do usuário
  let botResponse = '';// Variável para armazenar a resposta do bot
  
// Lógica para determinar a resposta do bot com base na mensagem do usuário
  switch (true) {
  case userMessage.includes('oi') || userMessage.includes('olá'): {
  const respostas = [
    'Oi torcedor Furioso(a), eu me chamo Pantera! O que você gostaria de saber sobre a FURIA CS?',
    'Olá! Sou o Pantera, o bot oficial da FURIA. Como posso te ajudar hoje?',
    'E aí, torcedor(a)! Pronto para saber mais sobre a FURIA?',
    'Oi! Quer saber sobre os jogadores, campeonatos ou conquistas da FURIA?',
    'Olá, torcedor(a) Furioso(a)! Estou aqui para responder suas perguntas sobre a FURIA Esports!'
  ];
  botResponse = respostas[Math.floor(Math.random() * respostas.length)];
  break;
}

    case userMessage.includes('jogadores') || userMessage.includes('lineup') || userMessage.includes('time'):
      const jogadores = furiaInfo.jogadores.map(
        (jogador) => `${jogador.nome}`
      );
      botResponse = `Os jogadores da FURIA são:\n ${jogadores.join('\n ')}.`;
      break;

    case userMessage.includes('tecnico') || userMessage.includes('coach'):
      botResponse = `O técnico da FURIA é ${furiaInfo.time.tecnico}.`;
      break;

    case userMessage.includes('redes sociais') || userMessage.includes('social media'):
      botResponse = `Aqui estão as redes sociais da FURIA:\n- Twitter: ${furiaInfo.time.twitter}\n- Twitch: ${furiaInfo.time.twitch}\n- Instagram: ${furiaInfo.time.intagram}\n- Site oficial: ${furiaInfo.time.site}`;
      break;

    case userMessage.includes('ranking'):
      botResponse = `📊 A FURIA está atualmente em:\n\n ${furiaInfo.time.rankingHltv} lugar no ranking da HLTV\n- ${furiaInfo.time.rankingValve} lugar no ranking da Valve! 🏆`;
      break;

    case userMessage.includes('ultimos campeonatos'):
      const ultimos = furiaInfo.Campeonatos.ultimos.map(
        (ultimos) => `${ultimos.campeonato} (data: ${ultimos.data} - 
        local: ${ultimos.local}) - 
        resultado: ${ultimos.resultado}\n`     
          
      );
      botResponse = `${ultimos.join('\n')}.`;
      break;

    case userMessage.includes('proximos campeonatos'):
      const proximos = furiaInfo.Campeonatos.proximos.map(
        (proximos) => `${proximos.campeonato} (${proximos.data} 
        - ${proximos.local})\n`     
          
      );
      botResponse = `${proximos.join('\n')}.`;
      break;

    case userMessage.includes('conquistas'):
      botResponse = `As maiores conquistas da FURIA incluem: ${furiaInfo.conquistas.join('\n ')}.`;
      break;

    case userMessage.includes('camisa') || userMessage.includes('jersey') || userMessage.includes('uniforme'):
      botResponse = `👕 Você pode encontrar as camisas oficiais da FURIA no site oficial: ${furiaInfo.time.camisa} 🛒`;
      break;

    case userMessage.includes('mapa mais jogado'):
      const mapaMaisJogado = furiaInfo.Mapas.reduce((maisJogado, mapaAtual) => {
        const partidasMaisJogado = maisJogado.vitoria + maisJogado.derrotas;
        const partidasAtual = mapaAtual.vitoria + mapaAtual.derrotas;
        return partidasAtual > partidasMaisJogado ? mapaAtual : maisJogado;
      });

      botResponse = `🗺️ O mapa mais jogado pela FURIA é ${mapaMaisJogado.mapa} com ${mapaMaisJogado.vitoria + mapaMaisJogado.derrotas} partidas (${mapaMaisJogado.vitoria} vitórias e ${mapaMaisJogado.derrotas} derrotas). `;
      break;

    case userMessage.includes('mapa menos jogado'):
      const mapaMenosJogado = furiaInfo.Mapas.reduce((menosJogado, mapaAtual) => {
        const partidasMenosJogado = menosJogado.vitoria + menosJogado.derrotas;
        const partidasAtual = mapaAtual.vitoria + mapaAtual.derrotas;
        return partidasAtual < partidasMenosJogado ? mapaAtual : menosJogado;
      });

      botResponse = `O mapa menos jogado pela FURIA é ${mapaMenosJogado.mapa}, com ${mapaMenosJogado.vitoria + mapaMenosJogado.derrotas} partidas (${mapaMenosJogado.vitoria} vitórias e ${mapaMenosJogado.derrotas} derrotas).`;
      break;

    case userMessage.includes('mapa com mais vitorias'):
      const mapaMaisVitorias = furiaInfo.Mapas.reduce((maisVitorias, mapaAtual) => {
        return mapaAtual.vitoria > maisVitorias.vitoria ? mapaAtual : maisVitorias;
      });

      botResponse = `O mapa com mais vitórias pela FURIA é ${mapaMaisVitorias.mapa}, com ${mapaMaisVitorias.vitoria} vitórias.🔥`;
      break;

    case userMessage.includes('mapa com mais derrotas'):
      const mapaMaisDerrotas = furiaInfo.Mapas.reduce((maisDerrotas, mapaAtual) => {
        return mapaAtual.derrotas > maisDerrotas.derrotas ? mapaAtual : maisDerrotas;
      });

      botResponse = `O mapa com mais derrotas pela FURIA é ${mapaMaisDerrotas.mapa}, com ${mapaMaisDerrotas.derrotas} derrotas.`;
      break;

    case userMessage.includes('maior porcentagem de vitoria') || userMessage.includes('maior taxa de vitoria') || userMessage.includes('maior winrate'):
      const mapaMaiorPorcentagem = furiaInfo.Mapas.reduce((maiorPorcentagem, mapaAtual) => {
        const porcentagemAtual = parseFloat(mapaAtual.vitoriaPorcentagem);
        const porcentagemMaior = parseFloat(maiorPorcentagem.vitoriaPorcentagem);
        return porcentagemAtual > porcentagemMaior ? mapaAtual : maiorPorcentagem;
      });

      botResponse = `O mapa com a maior porcentagem de vitória pela FURIA é ${mapaMaiorPorcentagem.mapa}, com ${mapaMaiorPorcentagem.vitoriaPorcentagem} de vitórias.`;
      break;

    case userMessage.includes('mapa mais escolhido'):
      const mapaMaisEscolhido = furiaInfo.Mapas.reduce((maisEscolhido, mapaAtual) => {
        const pickAtual = parseFloat(mapaAtual.pickPorcentagem);
        const pickMaisEscolhido = parseFloat(maisEscolhido.pickPorcentagem);
        return pickAtual > pickMaisEscolhido ? mapaAtual : maisEscolhido;
      });

      botResponse = `O mapa mais escolhido pela FURIA é ${mapaMaisEscolhido.mapa}, com ${mapaMaisEscolhido.pickPorcentagem} de escolhas.`;
      break;

    case userMessage.includes('mapa mais banido'):
      const mapaMaisBanido = furiaInfo.Mapas.reduce((maisBanido, mapaAtual) => {
        const banAtual = parseFloat(mapaAtual.banPorcentagem);
        const banMaisBanido = parseFloat(maisBanido.banPorcentagem);
        return banAtual > banMaisBanido ? mapaAtual : maisBanido;
      });

      botResponse = `O mapa mais banido pela FURIA é ${mapaMaisBanido.mapa}, com ${mapaMaisBanido.banPorcentagem} de bans.`;
      break;

    
      case userMessage.includes('ajuda') || userMessage.includes('help'):
        botResponse = `💡 Aqui estão algumas coisas que você pode perguntar:\n
        - Jogadores (ex: "Quais são os jogadores da FURIA?")\n
        - Ranking (ex: "Qual é o ranking da FURIA?")\n
        - Próximos campeonatos (ex: "Quais são os próximos campeonatos?")\n
        - Conquistas (ex: "Quais são as conquistas da FURIA?")\n
        - Mapas mais jogados (ex: "Qual é o mapa mais jogado pela FURIA?")\n
        - Mapas com mais vitórias ou derrotas\n
        - Redes sociais (ex: "Quais são as redes sociais da FURIA?")\n
        - Informações sobre mapas específicos (ex: "Me fale sobre Mirage")\n
        - Camisas ou produtos oficiais (ex: "Onde posso comprar a camisa da FURIA?")`;
        break;

   default:
      botResponse = `Desculpe, não entendi sua pergunta. 🤔\n\n💡 Você pode perguntar sobre:\n- Jogadores\n- Ranking\n- Próximos campeonatos\n- Conquistas da FURIA`;
      break;

    case furiaInfo.Mapas.some((mapa) => userMessage.includes(mapa.mapa.toLowerCase())):
      const mapaEncontrado = furiaInfo.Mapas.find((mapa) =>
        userMessage.includes(mapa.mapa.toLowerCase())
      );

      if (mapaEncontrado) {
        botResponse = `🗺️ Aqui estão as informações sobre o mapa ${mapaEncontrado.mapa}:\n\n` +
          `- Vitórias: ${mapaEncontrado.vitoria}\n` +
          `- Derrotas: ${mapaEncontrado.derrotas}\n` +
          `- Taxa de vitória: ${mapaEncontrado.vitoriaPorcentagem}\n` +
          `- Escolhido: ${mapaEncontrado.pickPorcentagem}\n` +
          `- Banido: ${mapaEncontrado.banPorcentagem}\n\n`+
          `💡 Você também pode perguntar sobre o mapa mais jogado ou o mapa com mais vitórias!`;
      } else {
        botResponse = 'Desculpe, não encontrei informações sobre esse mapa.';
      }
      break;

      case userMessage.includes('redes sociais') || userMessage.includes('social media'):
        botResponse = `Aqui estão as redes sociais da FURIA:
        - Twitter: ${furiaInfo.time.twitter}  
        - Twitch: ${furiaInfo.time.twitch}
        - Instagram: ${furiaInfo.time.intagram}
        - Site oficial: ${furiaInfo.time.site}`;
        break;  

  }

  // Retorna a resposta do bot com um atraso de 1 segundo
  setTimeout(() => {
    res.json({ sender: 'Pantera', reply: botResponse });
  }, 1000); 
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});