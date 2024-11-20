
// Objeto com preços para cada elo e divisão
const precosElo = {
    'ferro': { '1': 15.99, '2': 15.99, '3': 15.99, '4': 15.99 },
    'bronze': { '1': 19.99, '2': 19.99, '3': 19.99, '4': 19.99 },
    'prata': { '1': 23.99, '2': 23.99, '3': 23.99, '4': 23.99 },
    'ouro': { '1': 29.99, '2': 29.99, '3': 29.99, '4': 29.99 },
    'platina': { '1': 41.99, '2': 41.99, '3': 41.99, '4': 41.99 },
    'esmeralda': { '1': 74.99, '2': 74.99, '3': 74.99, '4': 74.99 },
    'diamante': { '1': 100.99, '2': 100.99, '3': 100.99, '4': 100.99 },
    'mestre': { '1': 0, '2': 0, '3': 0, '4': 120.00 }
};

// Objeto com os descontos específicos para cada elo
const descontosDoElo = {
    'ferro': 10.99,
    'bronze': 10.99,
    'prata': 10.99,
    'ouro': 30.99,
    'platina': 30.99,
    'esmeralda': 30.99,
    'diamante': 30.99,
    'mestre': 30.99
};

// Objeto com a adição se escolher o planoExtra
const planoExtra = { 
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
let precosTemporarios = JSON.parse(JSON.stringify(precosElo)); // Cria uma cópia dos preços

// Função para calcular o preço total de acordo com a hierarquia de elos
function calcularCustoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada) {
    const nivelAtual = hierarquia[eloAtual][divisaoAtual];
    const nivelDesejado = hierarquia[eloDesejado][divisaoDesejada];

    let custoTotal = 0;

    if (nivelDesejado > nivelAtual) {
        // Subir na hierarquia
        let elo = eloAtual;
        let divisao = divisaoAtual;

        while (elo !== eloDesejado || divisao !== divisaoDesejada) {
            if (elo !== eloDesejado || divisao !== divisaoDesejada) {
                custoTotal += precosTemporarios[elo][divisao];
            }

            if (divisao === '1') {
                elo = avancarElo(elo);
                divisao = '4';
            } else {
                divisao = (parseInt(divisao) - 1).toString();
            }
        }
        custoTotal += precosTemporarios[eloDesejado][divisaoDesejada];
    } else if (nivelDesejado < nivelAtual) {
        // Descer na hierarquia
        let elo = eloAtual;
        let divisao = divisaoAtual;

        while (elo !== eloDesejado || divisao !== divisaoDesejada) {
            if (elo !== eloDesejado || divisao !== divisaoDesejada) {
                custoTotal -= precosTemporarios[elo][divisao];
            }

            if (divisao === '4') {
                elo = retrocederElo(elo);
                divisao = '1';
            } else {
                divisao = (parseInt(divisao) + 1).toString();
            }
        }
    }

    return Math.max(custoTotal, 0); // Garante que o preço não fique negativo
}



// Funções auxiliares para obter o próximo e anterior elo
function avancarElo(elo) {
    const elos = ['ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda', 'diamante', 'mestre'];
    const index = elos.indexOf(elo);
    return index < elos.length - 1 ? elos[index + 1] : elo; // Retorna o próximo elo
}

function retrocederElo(elo) {
    const elos = ['ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda', 'diamante', 'mestre'];
    const index = elos.indexOf(elo);
    return index > 0 ? elos[index - 1] : elo; // Retorna o elo anterior
}



// Event listeners para atualizar o preço ao mudar as seleções
document.getElementById('planos').addEventListener('change', atualizarValorDUO);
document.getElementById('liga').addEventListener('change', atualizarValorDUO);
document.getElementById('divisao').addEventListener('change', atualizarValorDUO);
document.getElementById('liga-desejada').addEventListener('change', atualizarValorDUO);
document.getElementById('divisao-desejada').addEventListener('change', atualizarValorDUO);




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

function atualizarValorDUO() {
    const eloAtual = document.getElementById('liga').value;
    const divisaoAtual = document.getElementById('divisao').value;
    const eloDesejado = document.getElementById('liga-desejada').value;
    const divisaoDesejada = document.getElementById('divisao-desejada').value;
    const planoSelecionado = document.getElementById('planos').value; // Pega o plano selecionado

    precosTemporarios = JSON.parse(JSON.stringify(precosElo)); // Reseta os preços temporários

    if (eloAtual && divisaoAtual) {
        precosTemporarios[eloAtual][divisaoAtual] = 0;
    }

    let custoTotal = calcularCustoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada);
    let adicionalExtra = 0;

    if (planoSelecionado === 'Cronos' && custoTotal > 0) {
        adicionalExtra = planoExtra[eloAtual] || 0;
    }

    custoTotal += adicionalExtra;

    if (custoTotal === 0) {
        document.getElementById('card-alternativo').style.display = 'block';
        document.getElementById('container-preco').style.display = 'none';
    } else {
        document.getElementById('card-alternativo').style.display = 'none';
        document.getElementById('container-preco').style.display = 'block';
        
        document.querySelector('#precos p:nth-child(3)').textContent = `R$ ${custoTotal.toFixed(2).replace('.', ',')}`;
        const desconto = descontosDoElo[eloAtual] || 0;
        const precoOriginal = custoTotal + desconto;
        document.querySelector('#precos p:nth-child(1)').textContent = `DE: R$ ${precoOriginal.toFixed(2).replace('.', ',')}`;

        document.querySelector('#pedido #align-elo p:nth-child(1)').textContent = `${eloAtual.toUpperCase()} ${divisaoAtual}`;
        
        if (eloDesejado === "mestre") {
            document.querySelector('#pedido #align-elo p:nth-child(2)').textContent = "MESTRE";
        } else {
            document.querySelector('#pedido #align-elo p:nth-child(2)').textContent = `${eloDesejado.toUpperCase()} ${divisaoDesejada}`;
        }

        console.log(custoTotal);
    }
}


// Event listeners para atualizar as imagens e pedidos ao mudar as seleções
document.getElementById('liga').addEventListener('change', () => {
    atualizarImagem('card1', 'liga');
});

document.getElementById('liga-desejada').addEventListener('change', () => {
    atualizarImagem('card2', 'liga-desejada');
});


// Chama as funções para definir as imagens iniciais ao carregar a página
atualizarImagem('card1', 'liga');
atualizarImagem('card2', 'liga-desejada');



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

    const mensagem = `Olá, gostaria de fazer o pedido do serviço DuoBoost:
    Elo Atual: ${eloAtual} ${divisaoAtual}
    Elo Desejado: ${eloDesejado} ${divisaoDesejada}
    Plano: ${planoDesejado}
    Preço Final: ${precoFinal}`;

    const numeroWhatsApp = "5511991983299"; // Substitua pelo número de WhatsApp desejado
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, '_blank');
}

document.querySelector('#pedido button').addEventListener('click', enviarParaWhatsApp);