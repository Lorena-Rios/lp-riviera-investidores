
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
