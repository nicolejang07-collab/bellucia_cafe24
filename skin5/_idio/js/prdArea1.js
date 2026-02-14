var swiper = new Swiper('.prdArea1-swiper', {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: false,
	navigation: {
		nextEl: '.prdArea1 .swiper-button-next',
		prevEl: '.prdArea1 .swiper-button-prev',
	},
	breakpoints: {
		480: {
			slidesPerView: 2,
			spaceBetween: 12,
		},
		860: {
			slidesPerView: 3,
			spaceBetween: 20,
		}
	}
});