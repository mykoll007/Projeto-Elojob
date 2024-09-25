const precoBase = 0;
// Objeto com preços para cada elo e divisão
const precosElo = {
    'ferro': { '1': 10.99, '2': 10.99, '3': 10.99, '4': 10.99 },
    'bronze': { '1': 12.99, '2': 12.99, '3': 12.99, '4': 12.99 },
    'prata': { '1': 14.99, '2': 14.99, '3': 14.99, '4': 14.99 },
    'ouro': { '1': 18.99, '2': 18.99, '3': 18.99, '4': 18.99 },
    'platina': { '1': 24.99, '2': 24.99, '3': 24.99, '4': 24.99 },
    'esmeralda': { '1': 41.99, '2': 41.99, '3': 41.99, '4': 41.99 },
    'diamante': { '1': 69.99, '2': 69.99, '3': 69.99, '4': 69.99 }
  };
  
  // Hierarquia dos elos em valores numéricos para comparação
  const hierarquia = {
    'ferro': { '4': 1, '3': 2, '2': 3, '1': 4 },
    'bronze': { '4': 5, '3': 6, '2': 7, '1': 8 },
    'prata': { '4': 9, '3': 10, '2': 11, '1': 12 },
    'ouro': { '4': 13, '3': 14, '2': 15, '1': 16 },
    'platina': { '4': 17, '3': 18, '2': 19, '1': 20 },
    'esmeralda': { '4': 21, '3': 22, '2': 23, '1': 24 },
    'diamante': { '4': 25, '3': 26, '2': 27, '1': 28 }
  };
  
  // Função para calcular o preço total de acordo com a hierarquia de elos
  function calcularPrecoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada) {
    const nivelAtual = hierarquia[eloAtual][divisaoAtual];
    const nivelDesejado = hierarquia[eloDesejado][divisaoDesejada];
    
    let precoTotal = 0;
  
    // Se o elo desejado é maior que o atual, somamos os preços das divisões entre os níveis
    if (nivelDesejado > nivelAtual) {
      let elo = eloAtual;
      let divisao = divisaoAtual;
  
      // Começamos do elo e divisão atuais até o elo desejado
      while (elo !== eloDesejado || divisao !== divisaoDesejada) {
        // Soma o preço da divisão atual
        if (elo !== eloDesejado || divisao !== divisaoDesejada) {
          precoTotal += precosElo[elo][divisao];
        }
  
        // Subir na hierarquia das divisões
        if (divisao === '1') { // Se estamos na primeira divisão, vamos para o próximo elo
          if (elo === 'ferro') elo = 'bronze';
          else if (elo === 'bronze') elo = 'prata';
          else if (elo === 'prata') elo = 'ouro';
          else if (elo === 'ouro') elo = 'platina';
          else if (elo === 'platina') elo = 'esmeralda';
          else if (elo === 'esmeralda') elo = 'diamante';
          divisao = '4'; // Resetamos para a última divisão do novo elo
        } else {
          divisao = (parseInt(divisao) - 1).toString(); // Vai para a próxima divisão dentro do mesmo elo
        }
      }
  
      // Soma o preço da última divisão desejada
      precoTotal += precosElo[eloDesejado][divisaoDesejada];
    }
  
    return precoTotal;
  }
  
  // Função para atualizar os preços com base nos elos e divisões atuais e desejadas
  function atualizarPreco() {
    const eloAtual = document.getElementById('liga').value;
    const divisaoAtual = document.getElementById('divisao').value;
    const eloDesejado = document.getElementById('liga-desejada').value;
    const divisaoDesejada = document.getElementById('divisao-desejada').value;

    // Reseta os preços temporários
    precosEloTemporarios = { ...precosElo };

    // Verifica se a liga e a divisão atuais estão selecionadas
    if (eloAtual && divisaoAtual) {
        // Define o preço do elo atual como 0
        precosEloTemporarios[eloAtual][divisaoAtual] = 0;
    }

    const precoTotal = calcularPrecoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada);
    
    // Atualiza o valor exibido
    document.querySelector('#precos p:nth-child(3)').textContent = `R$ ${precoTotal.toFixed(2)}`;

    const precoOriginal = precoBase + precoTotal;
    document.querySelector('#precos p:nth-child(1)').textContent = `DE: R$ ${precoOriginal.toFixed(2)}`;

    // Atualiza o pedido na interface
    document.querySelector('#pedido #align-elo p:nth-child(1)').textContent = `${eloAtual.toUpperCase()} ${divisaoAtual}`;
    document.querySelector('#pedido #align-elo p:nth-child(3)').textContent = `${eloDesejado.toUpperCase()} ${divisaoDesejada}`;
}

// Modifique a função calcularPrecoTotal para usar os preços temporários
function calcularPrecoTotal(eloAtual, divisaoAtual, eloDesejado, divisaoDesejada) {
    const nivelAtual = hierarquia[eloAtual][divisaoAtual];
    const nivelDesejado = hierarquia[eloDesejado][divisaoDesejada];
    
    let precoTotal = 0;

    // Se o elo desejado é maior que o atual, somamos os preços das divisões entre os níveis
    if (nivelDesejado > nivelAtual) {
        let elo = eloAtual;
        let divisao = divisaoAtual;

        // Começamos do elo e divisão atuais até o elo desejado
        while (elo !== eloDesejado || divisao !== divisaoDesejada) {
            // Soma o preço da divisão atual
            if (elo !== eloDesejado || divisao !== divisaoDesejada) {
                precoTotal += precosEloTemporarios[elo][divisao];
            }

            // Subir na hierarquia das divisões
            if (divisao === '1') { // Se estamos na primeira divisão, vamos para o próximo elo
                if (elo === 'ferro') elo = 'bronze';
                else if (elo === 'bronze') elo = 'prata';
                else if (elo === 'prata') elo = 'ouro';
                else if (elo === 'ouro') elo = 'platina';
                else if (elo === 'platina') elo = 'esmeralda';
                else if (elo === 'esmeralda') elo = 'diamante';
                divisao = '4'; // Resetamos para a última divisão do novo elo
            } else {
                divisao = (parseInt(divisao) - 1).toString(); // Vai para a próxima divisão dentro do mesmo elo
            }
        }

        // Soma o preço da última divisão desejada
        precoTotal += precosEloTemporarios[eloDesejado][divisaoDesejada];

        console.log(`Elo Atual: ${eloAtual}, Divisão Atual: ${divisaoAtual}`);
        console.log(`Elo Desejado: ${eloDesejado}, Divisão Desejada: ${divisaoDesejada}`);
        console.log(`Preço Total antes de somar: R$ ${precoTotal.toFixed(2)}`);
    }

    return precoTotal;
    
}

// Event listeners para atualizar o preço ao mudar as seleções
document.getElementById('liga').addEventListener('change', atualizarPreco);
document.getElementById('divisao').addEventListener('change', atualizarPreco);
document.getElementById('liga-desejada').addEventListener('change', atualizarPreco);
document.getElementById('divisao-desejada').addEventListener('change', atualizarPreco);
  

  // Função para enviar mensagem no WhatsApp ao clicar no botão "COMPRAR"
  function enviarParaWhatsApp() {
    const eloAtual = document.getElementById('liga').options[document.getElementById('liga').selectedIndex].text;
    const divisaoAtual = document.getElementById('divisao').value;
    const eloDesejado = document.getElementById('liga-desejada').options[document.getElementById('liga-desejada').selectedIndex].text;
    const divisaoDesejada = document.getElementById('divisao-desejada').value;
  
    const precoFinal = document.querySelector('#precos p:nth-child(3)').textContent;
  
    const mensagem = `Olá, gostaria de fazer o pedido do serviço:
    Elo Atual: ${eloAtual} ${divisaoAtual}
    Elo Desejado: ${eloDesejado} ${divisaoDesejada}
    Preço Final: ${precoFinal}`;
  
    const numeroWhatsApp = "5511999999999"; // Substitua pelo número de WhatsApp desejado
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
  
    window.open(linkWhatsApp, '_blank');
  }
  
  document.querySelector('button').addEventListener('click', enviarParaWhatsApp);
  
  document.getElementById('liga').addEventListener('change', atualizarPreco);
  document.getElementById('divisao').addEventListener('change', atualizarPreco);
  document.getElementById('liga-desejada').addEventListener('change', atualizarPreco);
  document.getElementById('divisao-desejada').addEventListener('change', atualizarPreco);
  

