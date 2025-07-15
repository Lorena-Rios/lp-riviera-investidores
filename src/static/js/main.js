
// SWIPER DO CARROSSEL
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.mySwiper', {
    slidesPerView: 1.1,
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    },
    breakpoints: {
      640: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      }
    }
  });
});



// CARROSSEL DE VÍDEOS
const videos = document.querySelectorAll("video");
    let current = 0;

    // Iniciar o primeiro vídeo
    videos[current].play();

    // Listener para quando qualquer vídeo terminar
    videos.forEach((video, index) => {
      video.addEventListener("ended", () => {
        const currentVideo = videos[current];
        const next = (current + 1) % videos.length;
        const nextVideo = videos[next];

        // Configura nextVideo antes do fade
        nextVideo.style.zIndex = 20;
        nextVideo.style.opacity = 0;
        nextVideo.currentTime = 0;

        // Começa a tocar o próximo vídeo já
        nextVideo.play();

        // Anima a sobreposição (next aparece por cima)
        gsap.to(nextVideo, {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            // Agora, depois do fade, abaixa o atual
            gsap.to(currentVideo, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                currentVideo.pause();
                currentVideo.currentTime = 0;
                currentVideo.style.zIndex = 0;
                nextVideo.style.zIndex = 10;
                current = next;
              }
            });
          }
        });
      });
    });

    // INICIALIZANDO AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true

    });


  // MENU HAMBURGUER
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  });


function mascara(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("execmascara()", 1);
}
function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}
function mtel(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v;
}
function id(el) {
  return document.getElementById(el);
}
window.onload = function () {
  document.querySelectorAll(".telefone").forEach((tel) => {
    tel.addEventListener("keyup", function () {
      mascara(this, mtel);
    });
  });
};

// FUNÇÃO PARA ABRIR E FECHAR O MODAL
function openModal(titulo, zap = false) {
  var modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.querySelector('[name="interesse"]').value = titulo;
  modal.querySelector(".modal-title").innerHTML = titulo;
  var form = modal.querySelector("form");
  if (zap) {
    form.setAttribute("data-zap", "sim");
  } else {
    form.removeAttribute("data-zap");
  }
}
function closeModal() {
  var modal = document.querySelector(".modal");
  modal.classList.add("hidden");
}

// ANIMAÇÃO DE BOTÕES E MAPA
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buttons-navegation > div");
    const hoverElements = document.querySelectorAll(".show-in-hover");

    // Oculta todos inicialmente
    hoverElements.forEach(el => {
      gsap.set(el, { display: "none", opacity: 0 });
    });

    buttons.forEach((button) => {
      const id = button.id;
      const path = document.querySelector(`#svg-map-${id.replace("btn-", "")} path`);
      const distanceMap = button.querySelector(".distance-map");
      const showInDivHover = button.querySelector(".show-in-div-hover");
      const originalClass = button.className;
      const hoverClass = button.getAttribute("data-hover-class") || "";
      const pathLength = path?.getTotalLength?.() || 0;

      const blackIcon = button.querySelector('#location-black-icon');
      const whiteIcon = button.querySelector('#location-white-icon');

      if (whiteIcon) whiteIcon.style.display = 'none';

      // Inicializar traçado e outros elementos
      if (path) {
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: -pathLength });
      }

      if (distanceMap) {
        gsap.set(distanceMap, {
          scale: 0,
          display: "none",
          transformOrigin: "top center"
        });
      }

      if (showInDivHover) {
        gsap.set(showInDivHover, {
          scale: 0,
          opacity: 0,
          display: "none",
          transformOrigin: "center center"
        });
      }

      let pathAnimation;

      button.addEventListener("mouseenter", () => {
        const duration = parseFloat(button.getAttribute("data-duration")) / 1000 || 2;

        if (blackIcon) blackIcon.style.display = 'none';
      if (whiteIcon) whiteIcon.style.display = 'block';

        // Path
        if (path) {
          pathAnimation = gsap.to(path, {
            strokeDashoffset: 0,
            duration: duration,
            ease: "power2.out"
          });
        }

        // Distance-map
        if (distanceMap) {
          gsap.set(distanceMap, { display: "block" });
          gsap.to(distanceMap, { scale: 1, duration: 0.4, ease: "back.out(1.6)" });
        }

        // Div-hover
        if (showInDivHover) {
          gsap.set(showInDivHover, { display: "flex" });
          gsap.to(showInDivHover, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" });
        }

        // Mostrar elementos com show-in-hover
        hoverElements.forEach(el => {
          const targets = el.getAttribute("data-show-in")?.split(",") || [];
          if (targets.includes(id)) {
            gsap.set(el, { display: "block", opacity: 0 });
            gsap.to(el, { opacity: 1, duration: 0.4 });
          }
        });

        // Classe hover
        if (hoverClass) button.className = hoverClass;
      });

      button.addEventListener("mouseleave", () => {
        const duration = parseFloat(button.getAttribute("data-duration")) / 1000 || 2;

          if (blackIcon) blackIcon.style.display = 'block';
          if (whiteIcon) whiteIcon.style.display = 'none';

        if (path && pathAnimation) {
          pathAnimation.kill();
          gsap.to(path, {
            strokeDashoffset: -pathLength,
            duration: duration * 0.3, // animação de saída mais rápida
            ease: "power2.in"
          });
        }

        if (distanceMap) {
          gsap.to(distanceMap, {
            scale: 0,
            duration: 0.3,
            ease: "power1.in",
            onComplete: () => {
              gsap.set(distanceMap, { display: "none" });
            }
          });
        }

        if (showInDivHover) {
          gsap.to(showInDivHover, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power1.in",
            onComplete: () => {
              gsap.set(showInDivHover, { display: "none" });
            }
          });
        }

        // Ocultar elementos com show-in-hover
        hoverElements.forEach(el => {
          const targets = el.getAttribute("data-show-in")?.split(",") || [];
          if (targets.includes(id)) {
            gsap.to(el, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => gsap.set(el, { display: "none" })
            });
          }
        });

        button.className = originalClass;
      });
    });
  });


document.querySelectorAll(".form-cadastro").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let textForm = form.querySelector(".text-form");
    if (textForm) {
      form.querySelector(".text-form").classList.add("hidden");
    }

    let loadForm = form.querySelector(".load-form");
    if (loadForm) {
      form.querySelector(".load-form").classList.remove("hidden");
    }

    var formData = new FormData(this);
    var jsonData = Object.fromEntries(formData.entries());

    if (!jsonData["email"]) {
      var telefoneNumerico = jsonData["telefone"].replace(/\D/g, "");
      jsonData["email"] = `${telefoneNumerico}@sememail.com`;
    }

    jsonData["empreendimento"] = "Riviera Praia do Forte";
    jsonData["communications"] = true;

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    var isZap = !!this.getAttribute("data-zap");

    jsonData["origem"] = urlParams.get("utm_source") || "direct";
    jsonData["meio"] = urlParams.get("utm_medium") || "direct";
    jsonData["campanha"] = urlParams.get("utm_campaign") || "direct";
    jsonData["origem"] += this.getAttribute("data-zap") ? "_zap" : "";

    console.log("Dados do formulário:", jsonData);

    // let url = "https://acheiinterativa.com.br/portal/cadastro/riviera-praia-do-forte/index.php";
    let url = "https://testerivieira.free.beeceptor.com";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisiÃ§Ã£o: ${response.statusText}`);
        }
        return response.text();
      })
      .then((res) => {
        if (textForm) {
          form.querySelector(".text-form").classList.remove("hidden");
        }

        if (loadForm) {
          form.querySelector(".load-form").classList.add("hidden");
        }

        if (isZap) {
          let dataJson = "";

          try {
            dataJson = JSON.parse(res);

            if (dataJson && dataJson.wpp_link) {
              window.location.href = `${dataJson.wpp_link}`;
            }
          } catch (error) {
            window.location.href = `./agradecimento`;
          }
        } else {
          if (
            jsonData["interesse"].toUpperCase() === "BAIXAR BOOK" ||
            jsonData["interesse"].toUpperCase().includes("BOOK")
          ) {
            window.location.href = `./baixar-book/${queryString}${
              queryString ? "&book=sim" : "?book=sim"
            }`;
          } else if (jsonData["interesse"].toUpperCase() === "BAIXE A PLANTA") {
            window.location.href = `./agradecimento/${queryString}${
              queryString ? "&book=sim" : "?planta=sim"
            }`;
          } else {
            window.location.href = `./agradecimento/${queryString}`;
          }
        }
      })
      .catch((error) => {
        alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
        console.log(error);

        if (textForm) {
          form.querySelector(".text-form").classList.remove("hidden");
        }

        if (loadForm) {
          form.querySelector(".load-form").classList.add("hidden");
        }
      });
  });
});
