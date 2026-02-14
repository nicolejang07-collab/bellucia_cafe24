var swiper = new Swiper('.rvBest-swiper', {
    slidesPerView: 2,
    centeredSlides: false,
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.rvBest .swiper-button-next',
        prevEl: '.rvBest .swiper-button-prev',
    },
    breakpoints: {
        680: {
            slidesPerView: 3,
        },
        840: {
            slidesPerView: 4,
        },
        1280: {
            slidesPerView: 5,
        }
    },
});
