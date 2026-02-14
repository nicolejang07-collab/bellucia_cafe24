/* 햄버거 */
$(function() {
	$('.menu_btn').click(function() {
		if (!$('.btn_wrapper').hasClass('clicked')) {
			$('.btn_wrapper').addClass('clicked');
			$('.nav').addClass('opened');
			$('.sidebar').addClass('opened');
			$('.sidebar-bg').stop(true).fadeIn(200);
		} else {
			$('.btn_wrapper').removeClass('clicked');
			$('.nav').removeClass('opened');
			$('.sidebar').removeClass('opened');
			$('.sidebar-bg').stop(true).fadeOut(200);
		}
	});
	$('.sidebar-bg').click(function() {
		$('.btn_wrapper').removeClass('clicked');
		$('.nav').removeClass('opened');
		$('.sidebar').removeClass('opened');
		$('.sidebar-bg').stop(true).fadeOut(200);
	});
});


/* gnb-top */
$(window).scroll(function() {
	if ($(document).scrollTop() > 0) {
		$('.gnb-top').addClass('fixed');
	} else {
		$('.gnb-top').removeClass('fixed');
	}
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


/* 검색 홍보문구 삭제 버튼 접속기기 구분 */
var browserType = "pc";
var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
for (var word in mobileKeyWords){
	if (navigator.userAgent.match(mobileKeyWords[word]) != null){
		browserType = "mobile";
	}
}
if(browserType == 'pc'){
	$('.schBox .btnDelete').remove();
}


/* 카테고리 끌어오기 */
$(document).ready(function(){
    $.ajax({
        url : '/exec/front/Product/SubCategory',
        dataType: 'json',
        success: function(aData) {
            if (!aData) return;

            $('.allCate').each(function(){
                var $allCate = $(this);
                var $d1_wrap = $allCate.find('.d1Box');
                var categoryMap = {};

                // 2뎁스 생성
                $.each(aData, function(_, key) {
                    var $d1 = $d1_wrap.find('.d1[data-param$="=' + key.parent_cate_no + '"]');

                    if ($d1.length > 0) {
                        if (!$d1.hasClass('pre')) {
                            $d1.addClass('pre').append('<ul class="d2Box" data-param="' + key.parent_cate_no + '"></ul>');

                            var d1Link = $d1.children('a').attr('href');
                            var d1Name = $d1.children('a').text();

							// 상위 메뉴 이름을 맨 앞에 li로 추가
							var $d1Title = $('<li class="d2 d2-title"><a href="' + d1Link + '">' + d1Name + '</a></li>');
							$d1.find('.d2Box').append($d1Title);
                        }
                        var $d2 = $('<li class="d2" data-param="'+key.param+'"><a href="/product/list.html'+key.param+'">'+key.name+'</a></li>');
                        $d1.find('.d2Box').append($d2);
                        categoryMap[key.cate_no] = $d2;
                    }
                });

                // 3뎁스 생성
                $.each(aData, function(_, key) {
                    var $d2 = categoryMap[key.parent_cate_no];

                    if ($d2) {
                        if ($d2.find('.d3Box').length === 0) {
                            $d2.addClass('has-sub').append('<ul class="d3Box" data-param="' + key.parent_cate_no + '"></ul>');

                            var d2Link = $d2.children('a').attr('href');
                            var d2Name = $d2.children('a').text();
                        }
                        $d2.find('.d3Box').append('<li class="d3" data-param="'+key.param+'"><a href="/product/list.html'+key.param+'">'+key.name+'</a></li>');
                    }
                });

                // 화살표 추가 (id가 'leftMenu'인 allCate에만 적용)
                if ($allCate.attr('id') === 'topMenu') {
                    $allCate.find('.d1.pre > .d2Box').each(function() {
                        $(this).addClass('inner');
                        $(this).append("<div class='d2BoxBg'></div>");
                    });
                }

                // 화살표 추가 (id가 'leftMenu'인 allCate에만 적용)
                if ($allCate.attr('id') === 'leftMenu') {
                    $allCate.find('.pre').each(function() {
                        $(this).children('a').parent('li').append("<a class='arr'><i class='fas fa-chevron-down'></i></a>");
                    });
                    $allCate.find('.d2.has-sub').each(function() {
                        $(this).children('a').parent('li').append("<a class='arr'><i class='fas fa-chevron-down'></i></a>");
                    });
                }
            });
			
			// leftMenu 서랍	
			$('div#leftMenu .arr').click(function() {
				var $currentArr = $(this);
				var $currentBox = $currentArr.prev('.d2Box, .d3Box');
				var $currentLi = $currentArr.closest('li');
				var $siblingLi = $currentLi.siblings();
				if ($currentBox.is(':hidden')) {
					$currentBox.slideDown(200);
					$siblingLi.find('.d2Box, .d3Box').slideUp(200);
					$siblingLi.removeClass('opened');
					$currentLi.addClass('opened');
				} else {
					$currentBox.slideUp(200);
					$currentLi.removeClass('opened');
				}
				$(this).closest('ul').siblings('ul').find('.d2Box, .d3Box').slideUp(200);
			});
			
        }
    });
	
	/*검색 키워드 없을 때 영역 삭제*/	
	if ($('.schArea .bestKeyword > ul li:first-child').outerWidth() > 60) {
		$('.schArea .bestKeyword').remove();
	}
});