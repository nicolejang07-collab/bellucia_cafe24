var swiper = new Swiper('.rvArea-swiper', {
    slidesPerView: 2,
    centeredSlides: false,
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.rvArea .swiper-button-next',
        prevEl: '.rvArea .swiper-button-prev',
    },
    grid: {
        rows: 2,
        fill: 'row',
    },
    breakpoints: {
        680: {
            slidesPerView: 3,
            grid: {
                rows: 2,
            },
        },
        840: {
            slidesPerView: 4,
            grid: {
                rows: 2,
            },
        },
        1280: {
            slidesPerView: 5,
            grid: {
                rows: 2,
            },
        }
    },
});
