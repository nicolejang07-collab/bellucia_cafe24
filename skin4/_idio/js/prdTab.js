var swiper = new Swiper('.prdTab-swiper', {
	effect: 'fade',
	loop: false,
	spaceBetween: 0,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.prdTab .swiper-pagination',
		clickable: true,
		renderBullet: function (index, className) {
			return '<li class="' + className + '"><span>' + (prdTabkeys[index]) + '</span></li>';
		},
	}
});

var ptDotHeight = $('.prdTab .swiper-pagination').height()
var ptTitHeight = $('.prdTab .titArea h3').height() + $('.prdTab .titArea p').height()
$('.prdTab .titArea').css('padding-bottom', ptDotHeight);
$('.prdTab .swiper-pagination').css('padding-top', ptTitHeight);