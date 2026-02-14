var swiper = new Swiper('.prdList-rcmm-swiper', {
	slidesPerView: 2,
	spaceBetween: 0,
	loop: false,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			scrollbar: {
				el: '.prdList-rcmm .swiper-scrollbar',
				hide: false,
				clickable: true,
			},
		},
		860: {
			slidesPerView: 3,
			navigation: {
				nextEl: '.prdList-rcmm .swiper-button-next',
				prevEl: '.prdList-rcmm .swiper-button-prev',
			},
			scrollbar: {
				el: '.prdList-rcmm .swiper-scrollbar',
				hide: false,
				clickable: true,
			},
		},
		1280: {
			slidesPerView: 4,
			navigation: {
				nextEl: '.prdList-rcmm .swiper-button-next',
				prevEl: '.prdList-rcmm .swiper-button-prev',
			},
			scrollbar: {
				el: '.prdList-rcmm .swiper-scrollbar',
				hide: false,
				clickable: true,
			},
		},
	},
});

var swiper = new Swiper('.prdList-new-swiper', {
	slidesPerView: 2,
	spaceBetween: 0,
	loop: false,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			scrollbar: {
				el: '.prdList-new .swiper-scrollbar',
				hide: false,
				clickable: true,
			},
		},
		860: {
			slidesPerView: 3,
			navigation: {
				nextEl: '.prdList-new .swiper-button-next',
				prevEl: '.prdList-new .swiper-button-prev',
			},
			scrollbar: {
				el: '.prdList-new .swiper-scrollbar',
				hide: false,
				clickable: true,
			},
		},
		1280: {
			slidesPerView: 4,
			navigation: {
				nextEl: '.prdList-new .swiper-button-next',
				prevEl: '.prdList-new .swiper-button-prev',
			},
			scrollbar: {
				el: '.prdList-new .swiper-scrollbar',
				hide: false,
				clickable: true,
			},
		},
	},
});