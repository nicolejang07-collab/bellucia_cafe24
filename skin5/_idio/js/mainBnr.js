/*화면폭에 맞게 이미지 교체*/
mainBnrRsp();
$(window).resize(function() {
	mainBnrRsp();
});
function mainBnrRsp() {
	if($(window).height() > $(window).width()) {
		$('.mainBnr').addClass('mo');
		$('.mainBnr').removeClass('pc');
	} else {
		$('.mainBnr').addClass('pc');
		$('.mainBnr').removeClass('mo');
	}
}

var swiper = new Swiper('.mainBnr-swiper', {
	effect: 'fade',
	loop: true,	
	autoplay: {
		delay: 5000,
	},
	navigation: {
		nextEl: '.mainBnr .swiper-button-next',
		prevEl: '.mainBnr .swiper-button-prev',
	},
	pagination: {
		el: ".mainBnr .swiper-pagination",
        clickable: true,
	},
});