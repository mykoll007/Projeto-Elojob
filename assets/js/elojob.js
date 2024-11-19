const precoBase = 0;
// Objeto com preços para cada elo e divisão
const precosElo = {
    'ferro': { '1': 10.99, '2': 10.99, '3': 10.99, '4': 10.99 },
    'bronze': { '1': 12.99, '2': 12.99, '3': 12.99, '4': 12.99 },
    'prata': { '1': 14.99, '2': 14.99, '3': 14.99, '4': 14.99 },
    'ouro': { '1': 18.99, '2': 18.99, '3': 18.99, '4': 18.99 },
    'platina': { '1': 24.99, '2': 24.99, '3': 24.99, '4': 24.99 },
    'esmeralda': { '1': 41.99, '2': 41.99, '3': 41.99, '4': 41.99 },
    'diamante': { '1': 69.99, '2': 69.99, '3': 69.99, '4': 69.99 },
    'mestre': { '1': 0, '2': 0, '3': 0, '4': 120.00 }
};

// Objeto com os descontos específicos para cada elo
const descontosElo = {
    'ferro': 10.99,
    'bronze': 10.99,
    'prata': 10.99,
    'ouro': 30.99,
    'platina': 30.99,
    'esmeralda': 30.99,
    'diamante': 30.99,
    'mestre': 30.99
};

// Objeto com a adição se escolher o planoCronos
const planoCronos = { 
    'ferro': 7.00, 
    'bronze': 7.00, 
    'prata': 10.00, 
    'ouro': 10.00, 
    'platina': 13.00, 
    'esmeralda': 15.00, 
    'diamante': 30.00
};


// Hierarquia dos elos em valores numéricos para comparação
const hierarquia = {
    'ferro': { '4': 1, '3': 2, '2': 3, '1': 4 },
    'bronze': { '4': 5, '3': 6, '2': 7, '1': 8 },
    'prata': { '4': 9, '3': 10, '2': 11, '1': 12 },
    'ouro': { '4': 13, '3': 14, '2': 15, '1': 16 },
    'platina': { '4': 17, '3': 18, '2': 19, '1': 20 },
    'esmeralda': { '4': 21, '3': 22, '2': 23, '1': 24 },
    'diamante': { '4': 25, '3': 26, '2': 27, '1': 28 },
    'mestre': { '4': 29, '3': 30, '2': 31, '1': 32 }

};

// Preços temporários para ajuste
let precosEloTemporarios = JSON.parse(JSON.stringify(precosElo)); // Cria uma cópia dos preços

// Função para calcular o preço total de acordo com a hierarquia de elos
function calcularPrecoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada) {
    const nivelAtual = hierarquia[eloAtual][divisaoAtual];
    const nivelDesejado = hierarquia[eloDesejado][divisaoDesejada];

    let precoTotal = 0;

    if (nivelDesejado > nivelAtual) {
        // Subir na hierarquia
        let elo = eloAtual;
        let divisao = divisaoAtual;

        while (elo !== eloDesejado || divisao !== divisaoDesejada) {
            if (elo !== eloDesejado || divisao !== divisaoDesejada) {
                precoTotal += precosEloTemporarios[elo][divisao];
            }

            if (divisao === '1') {
                elo = proximoElo(elo);
                divisao = '4';
            } else {
                divisao = (parseInt(divisao) - 1).toString();
            }
        }
        precoTotal += precosEloTemporarios[eloDesejado][divisaoDesejada];
    } else if (nivelDesejado < nivelAtual) {
        // Descer na hierarquia
        let elo = eloAtual;
        let divisao = divisaoAtual;

        while (elo !== eloDesejado || divisao !== divisaoDesejada) {
            if (elo !== eloDesejado || divisao !== divisaoDesejada) {
                precoTotal -= precosEloTemporarios[elo][divisao];
            }

            if (divisao === '4') {
                elo = anteriorElo(elo);
                divisao = '1';
            } else {
                divisao = (parseInt(divisao) + 1).toString();
            }
        }
    }

    return Math.max(precoTotal, 0); // Garante que o preço não fique negativo
}



function atualizarPreco() {
    const eloAtual = document.getElementById('liga').value;
    const divisaoAtual = document.getElementById('divisao').value;
    const eloDesejado = document.getElementById('liga-desejada').value;
    const divisaoDesejada = document.getElementById('divisao-desejada').value;
    const planoSelecionado = document.getElementById('planos').value; // Pega o plano selecionado

    // Reseta os preços temporários
    precosEloTemporarios = JSON.parse(JSON.stringify(precosElo));

    // Define o preço do elo atual como 0
    if (eloAtual && divisaoAtual) {
        precosEloTemporarios[eloAtual][divisaoAtual] = 0;
    }

    let precoTotal = calcularPrecoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada);

    // Variável para armazenar o adicional do plano
    let adicionalCronos = 0;

    // Se o plano "Cronos" for selecionado e o precoTotal for maior que 0, adiciona o valor extra do plano
    if (planoSelecionado === 'Cronos' && precoTotal > 0) {
        adicionalCronos = planoCronos[eloAtual] || 0; // Pega o valor extra do elo atual
    }

    // Atualiza o preço total com o adicional do plano Cronos
    precoTotal += adicionalCronos;

    // Condição para mostrar ou esconder o card alternativo
    if (precoTotal === 0) {
        document.getElementById('card-alternativo').style.display = 'block';
        document.getElementById('container-preco').style.display = 'none';
    } else {
        document.getElementById('card-alternativo').style.display = 'none';
        document.getElementById('container-preco').style.display = 'block';
        
        // Atualiza o valor exibido com desconto (POR)
        document.querySelector('#precos p:nth-child(3)').textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
        
        // Calcula o valor original (DE) com o acréscimo específico do elo
        const desconto = descontosElo[eloAtual] || 0;
        const precoOriginal = precoTotal + desconto;
        document.querySelector('#precos p:nth-child(1)').textContent = `DE: R$ ${precoOriginal.toFixed(2).replace('.', ',')}`;

        // Atualiza o pedido na interface
        document.querySelector('#pedido #align-elo p:nth-child(1)').textContent = `${eloAtual.toUpperCase()} ${divisaoAtual}`;
        document.querySelector('#pedido #align-elo p:nth-child(2)').textContent = `${eloDesejado.toUpperCase()} ${divisaoDesejada}`;
        console.log(precoTotal)
    }
}





// Funções auxiliares para obter o próximo e anterior elo
function proximoElo(elo) {
    const elos = ['ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda', 'diamante', 'mestre'];
    const index = elos.indexOf(elo);
    return index < elos.length - 1 ? elos[index + 1] : elo; // Retorna o próximo elo
}



function anteriorElo(elo) {
    const elos = ['ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda', 'diamante', 'mestre'];
    const index = elos.indexOf(elo);
    return index > 0 ? elos[index - 1] : elo; // Retorna o elo anterior
}


// Event listeners para atualizar o preço ao mudar as seleções
document.getElementById('planos').addEventListener('change', atualizarPreco);
document.getElementById('liga').addEventListener('change', atualizarPreco);
document.getElementById('divisao').addEventListener('change', atualizarPreco);
document.getElementById('liga-desejada').addEventListener('change', atualizarPreco);
document.getElementById('divisao-desejada').addEventListener('change', atualizarPreco);




// Função para atualizar a imagem do elo
function atualizarImagem(cardId, selectId) {
  const elo = document.getElementById(selectId).value;
  const imgSrc = `../assets/images/${elo}.png`;
  
  // Atualiza a imagem do card
  document.querySelector(`#${cardId} img`).src = imgSrc;

  // Atualiza as imagens em align-eloimg
  if (cardId === 'card1') {
      document.querySelector('#align-eloimg img:first-child').src = imgSrc; // Elo Atual
  } else {
      document.querySelector('#align-eloimg img:last-child').src = imgSrc; // Elo Desejado
  }
}

// Função para atualizar a parte do pedido
function atualizarPedido() {
    const ligaDesejada = document.getElementById('liga-desejada').value;
    const divisaoDesejada = document.getElementById('divisao-desejada').value;

    const eloDesejadoText = document.querySelector('#align-elo p:nth-child(2)'); // Onde está 'OURO 4'
    
    if (ligaDesejada === "mestre") {
        // Quando 'Mestre' é selecionado, apenas exibe "MESTRE" sem divisão
        eloDesejadoText.textContent = "MESTRE";
    } else {
        // Exibe a liga e a divisão normalmente
        eloDesejadoText.textContent = `${ligaDesejada.toUpperCase()} ${divisaoDesejada}`;
    }
}

// Event listeners para atualizar as imagens e pedidos ao mudar as seleções
document.getElementById('liga').addEventListener('change', () => {
  atualizarImagem('card1', 'liga');
  atualizarPedido(); // Atualiza o pedido ao mudar o elo
});

document.getElementById('liga-desejada').addEventListener('change', () => {
  atualizarImagem('card2', 'liga-desejada');
  atualizarPedido(); // Atualiza o pedido ao mudar o elo desejado
});

document.getElementById('divisao-desejada').addEventListener('change', () => {
  atualizarPedido(); // Atualiza o pedido ao mudar a divisão
});



// Event listeners para atualizar as imagens ao mudar as seleções
document.getElementById('liga').addEventListener('change', () => {
  atualizarImagem('card1', 'liga');
});

document.getElementById('liga-desejada').addEventListener('change', () => {
  atualizarImagem('card2', 'liga-desejada');
});

// Chama as funções para definir as imagens iniciais ao carregar a página
atualizarImagem('card1', 'liga');
atualizarImagem('card2', 'liga-desejada');
atualizarPedido();


// Função para quando selecionar o Mestre ele esconda a barrinha de divisão
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("liga-desejada").addEventListener("change", function() {
        var ligaSelecionada = this.value;
        var divisaoSelect = document.getElementById("divisao-desejada"); // Seleciona o <select> com ID 'divisao-desejada'
        var divisaoParagrafo = document.querySelector("#content-card2 p:nth-of-type(2)"); // Seleciona o segundo parágrafo

        if (ligaSelecionada === "mestre") {
            divisaoSelect.style.display = "none"; // Esconde o <select> de "Divisão Atual"
            divisaoParagrafo.style.display = "none"; // Esconde o parágrafo "Divisão Atual"
            
        } else {
            divisaoSelect.style.display = "inline-block"; // Mostra o <select> de "Divisão Atual"
            divisaoParagrafo.style.display = "inline-block"; // Mostra o parágrafo "Divisão Atual"
        }
    });
    
});






// Função para enviar mensagem no WhatsApp ao clicar no botão "COMPRAR"
function enviarParaWhatsApp() {
    const eloAtual = document.getElementById('liga').options[document.getElementById('liga').selectedIndex].text;
    const divisaoAtual = document.getElementById('divisao').value;
    const eloDesejado = document.getElementById('liga-desejada').options[document.getElementById('liga-desejada').selectedIndex].text;
    const divisaoDesejada = document.getElementById('divisao-desejada').value;
    const planoDesejado = document.getElementById("planos").value;

    const precoFinal = document.querySelector('#precos p:nth-child(3)').textContent;

    const mensagem = `Olá, gostaria de fazer o pedido do serviço Elojob:
    Elo Atual: ${eloAtual} ${divisaoAtual}
    Elo Desejado: ${eloDesejado} ${divisaoDesejada}
    Plano: ${planoDesejado}
    Preço Final: ${precoFinal}`;

    const numeroWhatsApp = "5511991983299"; // Substitua pelo número de WhatsApp desejado
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, '_blank');
}

document.querySelector('#pedido button').addEventListener('click', enviarParaWhatsApp);