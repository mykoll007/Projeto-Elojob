// Adiciona o evento ao select
document.getElementById('liga').addEventListener('change', atualizarElo);

function atualizarElo() {
  const ligaSelect = document.getElementById('liga');
  const eloImage = document.querySelector('#content-card1 img');
  const pedidoEloImage = document.querySelector('#align-elo img');
  const selectedEloText = document.querySelector('#align-elo p');

  const selectedValue = ligaSelect.value;
  const imagePath = `../assets/images/${selectedValue}.png`;

  // Muda a imagem e o texto do elo selecionado
  eloImage.src = imagePath;
  pedidoEloImage.src = imagePath;
  selectedEloText.textContent = selectedValue.toUpperCase();
}


  
let count = 1; // Começa com 1 partida
const maxPartidas = 5; // Número máximo de partidas

// Objeto que define o preço por partida para cada liga
const precosPorLiga = {
    ferro: 10,
    bronze: 20,
    prata: 30,
    ouro: 40,
    platina: 50,
    esmeralda: 60,
    diamante: 70,
    mestre: 80
};

let ligaAtual = 'prata'; // Liga inicial
let preco = precosPorLiga[ligaAtual]; // Preço inicial baseado na liga

const atualizarDisplay = () => {
    // Atualiza a cor dos quadrados com base na contagem
    for (let i = 1; i <= maxPartidas; i++) {
        const quadrado = document.getElementById(`quadrado${i}`);
        if (i <= count) {
            quadrado.style.backgroundColor = 'black'; 
        } else {
            quadrado.style.backgroundColor = 'white'; 
        }
    }

    // Atualiza o número exibido
    document.querySelector('#numero-part p').textContent = count;

    // Calcula e atualiza o preço "DE:"
    const precoDe = (precosPorLiga[ligaAtual] * count * 2).toFixed(2).replace(".", ",");
    document.querySelector('#precos p:nth-of-type(1)').textContent = `DE: R$ ${precoDe}`;

    // Atualiza o preço exibido "POR:"
    const precoPor = (preco * count).toFixed(2).replace(".", ",");
    document.querySelector('#precos p:nth-of-type(3)').textContent = `R$ ${precoPor}`;
};

const increment = () => {
    if (count < maxPartidas) {
        count++;
        atualizarDisplay();
    }
};

const decrement = () => {
    if (count > 1) {
        count--;
        atualizarDisplay();
    }
};

// Função para atualizar a liga e o preço
const atualizarLiga = () => {
    ligaAtual = document.getElementById('liga').value; // Obtém o valor selecionado
    preco = precosPorLiga[ligaAtual]; // Atualiza o preço baseado na liga selecionada
    atualizarDisplay(); // Atualiza a exibição
};

// Adiciona eventos de clique aos botões
document.getElementById('circulo-mais').onclick = increment;
document.getElementById('circulo-menos').onclick = decrement;

// Adiciona evento de mudança para o select de ligas
document.getElementById('liga').addEventListener('change', atualizarLiga);

// Inicializa a exibição
atualizarDisplay();


const enviarWhatsApp = () => {
  const mensagem = `Olá, gostaria de fazer o pedido do serviço MD5:\n` +
                   `Liga: ${ligaAtual.toUpperCase()}\n` +
                   `Quantidade de Partidas: ${count}\n` +
                   `Preço Total: R$ ${(preco * count).toFixed(2)}`;
  
  const numeroWhatsApp = "5511967541945"; // Substitua pelo seu número, incluindo o código do país
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

  // Abre a URL do WhatsApp em uma nova aba
  window.open(url, '_blank');
};

// Adiciona o evento de clique ao botão existente
document.querySelector('#pedido button').onclick = enviarWhatsApp;



