//Hamburguer
function clickMenu() {
  if (itens.style.display == "block" && btnIniciar.style.display == "block") {
    itens.style.display = "none";
    btnIniciar.style.display = "none";
  } else {
    itens.style.display = "block";
    btnIniciar.style.display = "block";
  }
}

//Perguntas Frequentes - Accordeon

let accordeon1 = document.getElementById("accordeon1");
let accordeon2 = document.getElementById("accordeon2");
let accordeon3 = document.getElementById("accordeon3");
let accordeon4 = document.getElementById("accordeon4");

//Accordeon 1
document.getElementById("btn-acordeon1").addEventListener("click", function () {
  const seta = document.querySelector("#btn-acordeon1 img");
  if (accordeon1.style.display === "") {

    accordeon1.style.display = "flex";
    seta.src = "assets/images/seta cima.png";
  } else {
    accordeon1.style.display = "";
    seta.src = "assets/images/seta baixo.png";
  }

});
//Accordeon 2
document.getElementById("btn-acordeon2").addEventListener("click", function () {
    const seta = document.querySelector("#btn-acordeon2 img");
    if (accordeon2.style.display === "") {
      accordeon2.style.display = "flex";
      seta.src = "assets/images/seta cima.png";
    } else {
      accordeon2.style.display = "";
      seta.src = "assets/images/seta baixo.png";
    }
  });
  //Accordeon 3
  document.getElementById("btn-acordeon3").addEventListener("click", function () {
    const seta = document.querySelector("#btn-acordeon3 img");
    if (accordeon3.style.display === "") {
      accordeon3.style.display = "flex";
      seta.src = "assets/images/seta cima.png";
    } else {
      accordeon3.style.display = "";
      seta.src = "assets/images/seta baixo.png";
    }
  });
    //Accordeon 4
    document.getElementById("btn-acordeon4").addEventListener("click", function () {
        const seta = document.querySelector("#btn-acordeon4 img");
        if (accordeon4.style.display === "") {
          accordeon4.style.display = "flex";
          seta.src = "assets/images/seta cima.png";
        } else {
          accordeon4.style.display = "";
          seta.src = "assets/images/seta baixo.png";
        }
      });

