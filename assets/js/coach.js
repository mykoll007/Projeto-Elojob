// Objeto que define o preço por quantidade de partidas
const precosPorPartida = {
    '5partidas': 34.99,
    '10partidas': 69.99, // Dobro do preço de 5 partidas
    '15partidas': 99.99  // Mantém o mesmo preço que 10 partidas
};

// Função para atualizar os preços com base na seleção
const atualizarPrecoPartidas = () => {
    const partidasSelect = document.getElementById('partidas');
    const precoPorElement = document.querySelector('#precos-coach p:nth-of-type(3)'); // Preço "POR"
    const precoDeElement = document.querySelector('#precos-coach p:nth-of-type(1)'); // Preço "DE"
    const definicaoPartidasElement = document.querySelector('#definicao-partidas p'); // Parágrafo para a definição das partidas

    const selectedValue = partidasSelect.value;
    const precoAtual = precosPorPartida[selectedValue];

    // Atualiza o preço "DE", que é R$ 20 a mais que o preço "POR"
    const precoDe = precoAtual + 20;
    precoDeElement.textContent = `DE: R$ ${precoDe.toFixed(2).replace('.', ',')}`;

    // Atualiza o texto do preço "POR"
    precoPorElement.textContent = `R$ ${precoAtual.toFixed(2).replace('.', ',')}`;

    // Atualiza o parágrafo para a definição das partidas
    definicaoPartidasElement.textContent = `${partidasSelect.options[partidasSelect.selectedIndex].text.toUpperCase()}`; // Atualiza o parágrafo
};

// Adiciona o evento de mudança ao select de partidas
document.getElementById('partidas').addEventListener('change', atualizarPrecoPartidas);

// Inicializa o preço na primeira carga
atualizarPrecoPartidas();


const enviarWhatsApp = () => {
    const partidasSelect = document.getElementById('partidas');
    const quantidadePartidas = partidasSelect.options[partidasSelect.selectedIndex].text; // Obtém o texto da opção selecionada
    const precoPor = precosPorPartida[partidasSelect.value]; // Obtém o preço "POR"
    
    const mensagem = `Olá, gostaria de fazer o pedido do serviço Coach:\n` +
                     `Quantidade de Partidas: ${quantidadePartidas},\n` +
                     `Preço Total: R$ ${precoPor.toFixed(2).replace('.', ',')}`;
    
    const numeroWhatsApp = "5511991983299"; 
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    // Abre a URL do WhatsApp em uma nova aba
    window.open(url, '_blank');
};

// Adiciona o evento de clique ao botão existente
document.querySelector('#pedido button').onclick = enviarWhatsApp;
