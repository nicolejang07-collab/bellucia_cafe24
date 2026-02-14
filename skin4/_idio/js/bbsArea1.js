var swiper = new Swiper('.bbsArea1-swiper', {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 0,
	centeredSlides: false,
	loop: false,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.bbsArea1 .swiper-button-next',
		prevEl: '.bbsArea1 .swiper-button-prev',
	},
	breakpoints: {
		420: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 12,
		},
		1280: {
			slidesPerView: 4,
			spaceBetween: 14,
		},
	},
});