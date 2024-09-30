//Perguntas Frequentes - Accordeon

let accordeon1 = document.getElementById("accordeon1");
let accordeon2 = document.getElementById("accordeon2");
let accordeon3 = document.getElementById("accordeon3");
let accordeon4 = document.getElementById("accordeon4");


//Accordeon 1

document.getElementById("btn-acordeon1").addEventListener("click", function () {
    const seta = document.querySelector("#btn-acordeon1 img");
    accordeon1.classList.toggle("active");

    if (accordeon1.classList.contains("active")) {
        seta.src = "assets/images/seta cima.png";
    } else {
        seta.src = "assets/images/seta baixo.png";
    }
});

//Accordeon 2

document.getElementById("btn-acordeon2").addEventListener("click", function () {
  const seta = document.querySelector("#btn-acordeon2 img");
  accordeon2.classList.toggle("active");

  if (accordeon2.classList.contains("active")) {
      seta.src = "assets/images/seta cima.png";
  } else {
      seta.src = "assets/images/seta baixo.png";
  }
});
  //Accordeon 3

  document.getElementById("btn-acordeon3").addEventListener("click", function () {
    const seta = document.querySelector("#btn-acordeon3 img");
    accordeon3.classList.toggle("active");
  
    if (accordeon3.classList.contains("active")) {
        seta.src = "assets/images/seta cima.png";
    } else {
        seta.src = "assets/images/seta baixo.png";
    }
  });
    //Accordeon 4
    document.getElementById("btn-acordeon4").addEventListener("click", function () {
      const seta = document.querySelector("#btn-acordeon4 img");
      accordeon4.classList.toggle("active");
    
      if (accordeon4.classList.contains("active")) {
          seta.src = "assets/images/seta cima.png";
      } else {
          seta.src = "assets/images/seta baixo.png";
      }
    });


      //Rolagem Suave no "Inicie Sua Ascensão"
      document.querySelector('#container-infos button a').addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const targetId = this.getAttribute('href'); // Obtém o ID de destino
        const targetElement = document.querySelector(targetId); // Seleciona o elemento de destino
    
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop, // Posição do elemento no topo
                behavior: 'smooth' // Rolagem suave
            });
        }
    });
  

    //Hover Suave no "Pronto para sua Ascensão?"
    const alignChamada = document.getElementById("align-chamada");
    const heading = alignChamada.querySelector("h2");
    const image = alignChamada.querySelector("img");
    
    alignChamada.addEventListener("mouseenter", function () {
        heading.style.transform = "scale(1.05)";
        image.style.transform = "translateX(10px) scale(1.05)";
    });
    
    alignChamada.addEventListener("mouseleave", function () {
        heading.style.transform = "scale(1)";
        image.style.transform = "translateX(0) scale(1)";
    });

    //Rolagem Suave no "Pronto para sua Ascensão?"
    document.querySelector('#chamada-serv a').addEventListener('click', function(event) {
      event.preventDefault(); // Evita o comportamento padrão do link
      const targetId = this.getAttribute('href'); // Obtém o ID de destino
      const targetElement = document.querySelector(targetId); // Seleciona o elemento de destino
  
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop, // Posição do elemento no topo
              behavior: 'smooth' // Rolagem suave
          });
      }
  });
