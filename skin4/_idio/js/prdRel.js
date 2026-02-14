var swiper = new Swiper('.prdRel-swiper', {
	slidesPerView: 2,
	spaceBetween: 0,
	loop: false,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.prdRel .swiper-button-next',
		prevEl: '.prdRel .swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 3,
			spaceBetween: 4,
		},
		680: {
			slidesPerView: 4,
			spaceBetween: 6,
		},
		1280: {
			slidesPerView: 5,
			spaceBetween: 8,
		}
	},
});