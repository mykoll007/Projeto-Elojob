//Hamburguer
function clickMenu() {
  if (itens.style.display == "block" && btnIniciar.style.display == "flex") {
    itens.style.display = "none";
    btnIniciar.style.display = "none";
  } else {
    itens.style.display = "block";
    btnIniciar.style.display = "flex";
  }
}


