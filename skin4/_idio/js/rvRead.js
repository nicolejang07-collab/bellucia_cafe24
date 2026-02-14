//리뷰내용태그제거
$(document).ready(function(){
	function deletetag(input, allow) {
		 if(allow.length !=0) {
			var regExp = "<\\/?(?!(" + allow.join('|') + "))\\b[^>]*>";
		} else {
			var regExp = "<\/?[^>]*>";
		}
		return input.replace(RegExp(regExp, "gi"), "");
	}
	var orgcont = $('.fr-view').html();
	var articlecont = deletetag(orgcont, ['br','p']);
	$('.fr-view').html(articlecont);
	$('.fr-view').find('br').removeAttr('style');
	$('.fr-view').find('p').removeAttr('style');
});

$('.idiowarns').remove();
$('.imgView .swiper-wrapper br').remove();
$('.imgView .swiper-wrapper img').wrap("<div class='swiper-slide'></div>");
	
var swiper = new Swiper('.imgView-swiper', {
	  slidesPerView: 1,
	  spaceBetween: 0,
	  loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

$('.swiper-wrapper').each(function(){
	if($(this).children().length == 0) {
		$(this).parents('#iReview').addClass('noimg');
	}
});

//접속기기 구분
var filter = "win16|win32|win64|mac";
if(navigator.platform){
	if(0 > filter.indexOf(navigator.platform.toLowerCase())) {
		$('.rvRead').addClass('mobile');
	} else {
		$('.rvRead').addClass('pcwin');
	}
}


//별점 0점 삭제
	$('.point > img').each(function() {
		if($(this).is("[src*='/_idio/img/ico_point_0.png']") == true) {
			$(this).parent('.point').remove();
		}
	});