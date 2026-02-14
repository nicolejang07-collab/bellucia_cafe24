/* 헤더픽스 */
$(window).scroll(function(){
	if($(document).scrollTop() > 44) {
			$('#header .header-inner').addClass('fixed');
	} else {
			$('#header .header-inner').removeClass('fixed');
	}
	return;	
});


/* 검색 */
$('.btn_sch').click(function() {
	$('.schArea').stop().fadeToggle(100);
});
$('.sch_close').click(function() {
	$('.schArea').stop().fadeToggle(100);
});
$('.sch_cover').click(function() {
	$('.schArea').stop().fadeToggle(100);
});


/* 좌측 네비게이션 열기 */
$(function() {
	$('.btn_drw').click(function() {
		if (!$('.btn_wrapper').hasClass('clicked')) {
			$('.nav').addClass('opened');
			$('.nav_cover').stop(true).fadeIn(200);
		} else {
			$('.nav').removeClass('opened');
			$('.nav_cover').stop(true).fadeOut(200);
		}
	});
	$('.nav_cover').click(function() {
		$('.nav').removeClass('opened');
		$('.nav_cover').stop(true).fadeOut(200);
	});
});


/* 탑메뉴 드롭다운 */
$('#topMenu .d1').hover(
	function() {
		$(this).find('.d2Box').fadeIn(150); 
	},
	function() {
		$(this).find('.d2Box').fadeOut(150); 
	}
);
$('#topMenu .arr').remove();


/* 카테고리 끌어오기 */
$(document).ready(function(){
    var $d1_wrap = $('.d1Box');
    var $d1_list = $d1_wrap.find('.d1');
    var len = $d1_list.length;
    $.ajax({
        url : '/exec/front/Product/SubCategory',
        dataType: 'json',
        success: function(aData) {
            if (aData == null || aData == 'undefined') {
                return;
            }
            $.each(aData, function(index, key) {
                var $d1 = $d1_wrap.find('.d1[data-param$="=' + key.parent_cate_no + '"]');
                if ($d1.length > 0) {
                    var _index = $d1_list.index($d1);

                    if ($d1.hasClass('pre') === false) {
                        $d1.addClass('pre');
                        $d1.append('<ul class="d2Box"></ul>');
                    }
                    $d1.find('.d2Box').append('<li class="d2" data-param="'+key.param+'"><a href="/product/list.html'+key.param+'">'+key.name+'</a></li>');
                    return;
                }	
            });
			$("div#leftMenu .pre").each(function(k,v) { 
				$(this).children('a').parent('li').append("<a class='arr'><i class='fas fa-chevron-down'></i></a>");
			});
			/* 서랍 */
			$('div#leftMenu .arr').click(function() {
				if($(this).prev('.d2Box').is(':hidden') == true) {
					$(this).prev('.d2Box').slideDown(200);
					$(this).parent('.d1').siblings().find('.d2Box').slideUp(200);
					$(this).parent('.d1').parent('ul').siblings().find('.d2Box').slideUp(200);
					$(this).parent('.d1').parent('ul').children('li').removeClass('opened');
					$(this).parent('.d1').parent('ul').siblings().children('li').removeClass('opened');
					$(this).parent('.d1').addClass('opened');
				} else {
					$(this).prev('.d2Box').slideUp(200);
					$(this).parent('.d1').removeClass('opened');
				}
			});
        }
    });
});


/* 검색영역 홍보문구 삭제 버튼 접속기기 구분 */
var browserType = "pc";
var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
for (var word in mobileKeyWords){
	if (navigator.userAgent.match(mobileKeyWords[word]) != null){
		browserType = "mobile";
	}
}
if(browserType == 'pc'){
	$('.schHdr .btnDelete').remove();
}