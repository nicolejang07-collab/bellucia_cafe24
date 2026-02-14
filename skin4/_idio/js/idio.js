/* 기본셋팅 */
$(document).ready(function(){
	function setLoad(){
		var keySlit;
		var keyElementSlit;
		var elementSelector;
		var classSlit;
		var listNum = new Object();		
		$.each(IDIO, function(key, value){
			keySlit = null;
			keyElementSlit = null;
			elementSelector = null;
			classSlit = null;
			keySplit = key.split('-');
			keyElementSlit = key.split('-');
			keyElementSlit.splice(0, 1);
			elementKey = keyElementSlit.join("-");			
			if(keySplit[0]=='text'){
				if($('#'+elementKey).length > 0){
					elementSelector = '#';
				}else{
					if($('.'+elementKey).length > 0){
						elementSelector = '.';
					}
				}
				$(elementSelector+elementKey).text(value);
			}
			if(keySplit[0]=='class'){
				if($('#'+elementKey).length > 0){
					elementSelector = '#';
				}else{
					if($('.'+elementKey).length > 0){
						elementSelector = '.';
					}
				}
				classSlit = value.split(',');
				$.each(classSlit, function(idx, classItem){
					classItem = classItem.trim();
					if(!$(elementSelector+elementKey).hasClass(classItem)){
						$(elementSelector+elementKey).addClass(classItem);
					}
				});
			}
			if(keySplit[0]=='href'){
				if($('#'+elementKey).length > 0){
					elementSelector = '#';
				}else{
					if($('.'+elementKey).length > 0){
						elementSelector = '.';
					}
				}
				$(elementSelector+elementKey).attr('href', value);
			}			
		});
	}
	setLoad();
});
var IDIO = {};


/* on, off */
$(document).ready(function(){
	$(".off").remove();
});


/*상품목록 할인율 및 상품정보표시설정*/
$(document).ready(function(){
	setTimeout(infoAC,700);
	setTimeout(saleprc,700);
	setTimeout(noCart,700);
	setTimeout(noChild,700);
	$('.xans-product-listmore').click(function(){
		setTimeout(infoAC,700);
		setTimeout(saleprc,700);
		setTimeout(noCart,700);
		setTimeout(noChild,700);
	});
});

	
/*li 없을 경우 삭제*/
function noChild() {	
	$('.noChild').each(function(){
		if($(this).children().length == 0) {
			$(this).remove();
		} 
	});
}

/*목록 장바구니 미사용, 품절 표시*/
function noCart() {	
	$('.prdList').removeClass('nocart');
	$('.prd-item').removeClass('prd-soldout');
	$('.prdList').each(function() {
		if ($(this).find('.btn_add em img').length === 0) {
			$(this).addClass('nocart');
		} else {
			$('.prd-item').each(function() {
				var soldOutImg = $(this).find('.icon img[src*="ico_product_soldout.gif"]');
				if (soldOutImg.length > 0) {
					$(this).addClass('prd-soldout');
					soldOutImg.remove();
				}
			});			
		}
	});
}

function infoAC() {
	$('.ec-base-product .spec > li.rvw .title i').remove();
	$('.spec > li').each(function(){
		var specTit = $(this).children('.title').children('span').text();
		if (specTit == '상품요약정보' || specTit == '상품 요약설명') {
			$(this).addClass('desc');
		} else if (specTit.includes('할인판매가')) {
			$(this).parent('.spec').addClass('promotion');
		} else if (specTit == '상품색상') {
			$(this).addClass('col');
			$(this).children('.title').remove();
		} else if (specTit == '영문상품명') {
			$(this).children('.title').remove();
			var engPrdName = $(this).html();
			$(this).parent('ul').siblings('.name').prepend("<div class='eng_name'>" + engPrdName + "</div>");
			$(this).remove();
		} else if (specTit == '할인기간' || specTit == '할인 기간') {
			var promoPeriod = $(this).find('.layerDiscountPeriod .content p strong').text().replace(' (', '<!--').replace(')', '--> <span class="nam">남음</span>').replace('남은시간', '<i class="fa-regular fa-clock"></i>').replace('일', '<span>일</span>');
			var countdownElement = $("<div class='timesale countdown'>" + promoPeriod + "</div>");
			$(this).parents('.prd-item').find('.thumbnail').prepend(countdownElement);
			$(this).remove();
			startCountdown(countdownElement);
		} else if (specTit == '상품후기' || specTit == '사용후기' || specTit == 'REVIEW' || specTit == 'REVIEWS' || specTit == 'Reviews' || specTit == 'Review' || specTit == 'reviews' || specTit == 'review' || specTit == '리뷰' || specTit == '후기' || specTit == '제품후기' || specTit == '상품리뷰' || specTit == '사용리뷰') {
			$(this).addClass('rvw');
			$(this).children('.title').prepend('<i class="fa-solid fa-star"></i>');
		}
	});
	function startCountdown(element) {
		var countdownElement = element[0];
		var timeString = countdownElement.innerText;
		function parseTimeString(timeString) {
			var timeParts = timeString.match(/(\d+)/g);
			return {
				days: parseInt(timeParts[0]),
				hours: parseInt(timeParts[1]),
				minutes: parseInt(timeParts[2]),
				seconds: parseInt(timeParts[3])
			};
		}
		function formatTimeString(time) {
			return `<i class="fa-regular fa-clock"></i>  ${String(time.days).padStart(2, '0')}<span>일</span> ${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')} <span class="nam">남음</span>`;
		}
		function updateCountdown() {
			var time = parseTimeString(countdownElement.innerText);        
			if (time.seconds > 0) {
				time.seconds--;
			} else if (time.minutes > 0) {
				time.seconds = 59;
				time.minutes--;
			} else if (time.hours > 0) {
				time.seconds = 59;
				time.minutes = 59;
				time.hours--;
			} else if (time.days > 0) {
				time.seconds = 59;
				time.minutes = 59;
				time.hours = 23;
				time.days--;
			} else {
				clearInterval(countdownInterval);
				return;
			}
			countdownElement.innerHTML = formatTimeString(time);
		}
		var countdownInterval = setInterval(updateCountdown, 1000);
	}
	$('.spec > li').each(function(){
		var specTit = $(this).children('.title').children('span').text();
		//가격표기
		if ($(this).parent('.spec').hasClass('promotion')) {
			//할인판매가O
			if (specTit == '판매가') {
				$(this).addClass('price pPrice');
				var pPrice = $(this).children('.title').next('span').text();
				var pPriceNum = pPrice.replace(/[^0-9]/g, "");
				$(this).parents('.description').attr('prc-pPrice',pPriceNum);
			} else if (specTit == '할인판매가') {
				$(this).addClass('price pSale');
				$(this).children('.title').next('span').find('span').remove();
				var pSale = $(this).children('.title').next('span').clone().children('span').remove().end().text();
				var pSaleNum = pSale.replace(/[^0-9]/g, "");
				$(this).parents('.description').attr('prc-pSale',pSaleNum);
			}
		} else {
			//할인판매가X
			if (specTit == '소비자가') {
				$(this).addClass('price pPrice');
				var pPrice = $(this).children('.title').next('span').text();
				var pPriceNum = pPrice.replace(/[^0-9]/g, "");
				$(this).parents('.description').attr('prc-pPrice',pPriceNum);
			} else if (specTit == '판매가') {
				$(this).addClass('price pSale');
				var pSale = $(this).children('.title').next('span').clone().children('span').remove().end().text();
				var pSaleNum = pSale.replace(/[^0-9]/g, "");
				$(this).parents('.description').attr('prc-pSale',pSaleNum);
			}
		}		
	});
	
	// 현재 li를 복사하여 .prc에 붙여넣기
	$('.prc > li').remove();
	$('.spec .price').each(function() {
		$(this).clone().appendTo($(this).parent('.spec').siblings('.prc'));
	});
	$('.prc').each(function() {
		var lineHeight = $(this).siblings('.name').find('a > span').css('line-height'); // line-height 값 가져오기
		var fontSize = $(this).siblings('.name').find('a > span').css('font-size'); // font-size 값 가져오기

		// line-height가 배수일 경우, font-size와 곱하여 절대값 계산
		if (lineHeight.indexOf('px') === -1) {
			lineHeight = parseFloat(lineHeight) * parseFloat(fontSize); // 배수 * font-size
		} else {
			lineHeight = parseFloat(lineHeight); // 이미 픽셀로 지정되어 있다면 그대로 사용
		}
		$(this).find('span').css('line-height', lineHeight + 'px'); // 해당 .prc 안의 span에 line-height 적용
		
		var prcWidth = $(this).width(); // .prc의 가로폭 추출

		if (prcWidth >= 20) {
		  var newPadding = prcWidth + 30; // 20px을 더한 값 계산
		  $(this).siblings('.name').css('padding-right', newPadding + 'px');
		}
	});
}

function saleprc() {
	$('.ic_sale').remove();
	var productListEl = $('.prdList');
	for (var i = 0; i < productListEl.length; i++) {
		var prdListEl = productListEl.eq(i).find('.prd-item');
		for (var j = 0; j < prdListEl.length; j++) {
			var priceEl = prdListEl.eq(j).find('.description'),
			salePriceEl = priceEl.find('.spec > li').eq(1).find('span:eq(1)');            
			percentageCul(priceEl, salePriceEl);
		}
	}
    function percentageCul(target, salePriceEl) {
		var iCustomPrice = parseInt(target.attr('prc-pPrice')),
		iPrice = parseInt(target.attr('prc-pSale')),
		pSale = prdListEl.eq(j).find('.pSale'),
		pSaleSize = pSale.find('span:eq(1)').css('font-size'),
		pPrice = prdListEl.eq(j).find('.pPrice').find('span:eq(1)'),
		iOfftoFixed = 0, // 할인율 소수점자릿수
		sSaleText = '',
		regexp = /\B(?=(\d{3})+(?!\d))/g;
        if (iCustomPrice > 0 && iPrice > 0 && iPrice != iCustomPrice) {
			sSaleText = (((iCustomPrice - iPrice) / iCustomPrice) * 100).toFixed(iOfftoFixed) + '<span>%</span>';
            pSale.append('<span class="ic_sale" style="font-size:' + pSaleSize + ';"> ' + sSaleText + '</span>');
        }
		pPrice.removeAttr();
		pPrice.attr('style', 'font-size:' + pSaleSize + ';' );
    }
}


$(function() {
	//게시판 카테고리 생성
	$('.xans-board-category').css('display','none');
	if($('.boardSort').find('#board_category').length == 1) {
		$('.boardSort').prepend("<div class='btnSort'></div>");
		$('#board_category').find('option').each(function(i, e){
			var cvalue = $(this).attr('value');
			var ctxt = $(this).text();
			$('.btnSort').append("<a href='" + window.location.href + "&category_no=" + cvalue + "' target='_top'>" + ctxt + "</a>");
		});
		$('.btnSort > a:first-child').text('ALL');
	}
	$('.btnSort > a').each(function(){
		var nowCate = $('#board_category').find('option:selected').text();
		$(this).removeClass('selected');
		if($(this).text() == nowCate) {
			$(this).addClass('selected');
		} else if (nowCate == '전체') {
			$('.btnSort > a:first-child').addClass('selected');
		}
	});
	
	//서브페이지 만들기
	$('.listnormal').each(function(){
		if($(this).height() == 0) {
			$('#container').removeClass('inner');
			$('#contents > div').each(function(){
				if($(this).is('[class*=product_top_image]') == true) {
				} else {
					$(this).remove();					
				}
			});
		}
	});
	
	//상품베스트넘버링
	$('.prdList.best li.prd-item').each(function(){
		$(this).find('.num').text($(this).index() + 1);
	});
	
	//AOS
	AOS.init({
		duration : 700,
		delay: 0,
		easing : 'ease-in-out-quad',
		once : true,
	});

	//일반게시판 패딩
	$('.ec-base-table tr').each(function() {
		var reico = $(this).find('.subject').children('img');
		if(reico.is("[src*='http://img.echosting.cafe24.com/design/skin/admin/ko_KR/ico_re.gif']") == true) {
			$(this).addClass('re');
		}
	});
	
	/* 화면폭 구분 */
	layoutRsp();
	let layoutResizeTimer;
	$(window).on('resize orientationchange', function () {
		clearTimeout(layoutResizeTimer);
		layoutResizeTimer = setTimeout(layoutRsp, 200);
	});
	function layoutRsp() {
		if ($(window).height() > $(window).width()) {
			$('body').addClass('mo').removeClass('pc');
		} else {
			$('body').addClass('pc').removeClass('mo');
		}
	}
	
	/*sns 로그인 자동 감춤*/	
	var $snsArea = $('.xans-member-login .snsArea');
	var $listItems = $snsArea.find('li');
	function checkDisplayNone() {
		var allDisplayNone = true;
		$listItems.each(function() {
			if (!$(this).hasClass('displaynone')) {
				allDisplayNone = false;
				return false; // loop를 중지
			}
		});
		return allDisplayNone;
	}
	if (checkDisplayNone()) {
		$snsArea.hide();
	}
	
	/*이미지 리스트 축소이미지 src 교체*/
	var newSrc = $('.imgArea .thumbnail img').attr('src');
	$('.imgArea .listImg li:first img').attr('src', newSrc);

});

$(document).ready(function() {	
	/*컨테이너 페이드인*/	
    $('#container').addClass('show');
});