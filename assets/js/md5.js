
  let count = 1; // Começa com 1 partida
  const maxPartidas = 5; // Número máximo de partidas

  const updateDisplay = () => {
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
  };

  const increment = () => {
    if (count < maxPartidas) {
      count++;
      updateDisplay();
    }
  };

  const decrement = () => {
    if (count > 1) {
      count--;
      updateDisplay();
    }
  };

  // Adiciona eventos de clique aos botões
  document.getElementById('circulo-mais').onclick = increment;
  document.getElementById('circulo-menos').onclick = decrement;

  // Inicializa a exibição
  updateDisplay();

