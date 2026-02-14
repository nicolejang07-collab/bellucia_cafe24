var swiper = new Swiper('.prdRcnt-swiper', {
	slidesPerView: 1,
	spaceBetween: 0,
	centeredSlides: false,
	centerInsufficientSlides: true,
	loop: true,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.prdRcnt .swiper-button-next',
		prevEl: '.prdRcnt .swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 4,
		},
		680: {
			slidesPerView: 3,
			spaceBetween: 6,
		},
		1280: {
			slidesPerView: 4,
			spaceBetween: 8,
		},
		1760: {
			slidesPerView: 5,
			spaceBetween: 10,
		}
	},
});