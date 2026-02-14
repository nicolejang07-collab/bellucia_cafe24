$(document).ready(function(){
	//리뷰내용태그제거
	$('#iReview .rvcont').each(function(){	
		function deletetag(input, allow) {
			 if(allow.length !=0) {
				var regExp = "<\\/?(?!(" + allow.join('|') + "))\\b[^>]*>";
			} else {
				var regExp = "<\/?[^>]*>";
			}
			return input.replace(new RegExp(regExp, "gi"), "");
		}
		var orgcont = $(this).html();
		var rvcont = deletetag(orgcont, ['br','p']);
		$(this).html(rvcont);
		$(this).find('br').removeAttr('style');
		$(this).find('p').removeAttr('style');
	});

	//본문 내용 자세히 보기
	$('.listType .rvcont-wrapper').each(function(){
		var rvcontHeight = $(this).children('.rvcont').height();
		if (rvcontHeight < 90) {
			$(this).children('.btn_rvread').remove();
		} else {
			$(this).css('cursor', 'pointer');
			$(this).children('.rvcont').addClass('of');
			$(this).on('click', function(e) {
				$(this).toggleClass('opened');
			});
		}
	});

	//답변리스트 표시
	$('#iReview .rvsbj img').each(function() {
		if($(this).is("[src*='http://img.echosting.cafe24.com/design/skin/admin/ko_KR/ico_re.gif']") == true) {
			$(this).addClass('ico_re');
			$(this).parents('.rvlist').addClass('re');
			var rmvRe = $(this).parents('.rvsbj').html().replaceAll('답변 ', '');
			$(this).parents('.rvsbj').html(rmvRe);
		}
	});

	//상세페이지 리뷰 공지
	$('.xans-product-additional .badge').each(function() {
		var sbjNotice = $(this).text();
		if(sbjNotice == '공지'){
			$(this).parents('tr').remove();
		}
	});
	
	//포토리뷰필터
	$('.imgbox').each(function(){
		if($(this).children().length == 0) {
			$(this).parents('.rvlist').addClass('noimg');
		}
	});

	//베스트 마크 체인지(리스트)
	$('.xans-board-fixed .badge').each(function() {
		$(this).html('<em>BEST</em>');
	});
	
	//베스트 마크 체인지(상품상세하단)
	$('.xans-product-additional .rvlist').each(function() {
		if ($(this).find('.badge img').is("[src*='//img.echosting.cafe24.com/skin/admin_ko_KR/board/ico_fixed_post.png']") == true) {
			$(this).addClass('fixed');
			$(this).find('.badge').html('<em>BEST</em>');
			$(this).clone().appendTo('.dtReview .swiper-wrapper');
		}
	});
	
	//btn_modal 모달 열기
	$('#iReview .btn_modal').on('click', function(e) {
		var readLink = $(this).parents('.rvlist').attr('data-link');
		$('.ireview-modal').show();
		if($(this).parents('.rvlist').hasClass('noimg') == true) {
			$('.ireview-modal').addClass('noimg')
		} else {
			$('.ireview-modal').removeClass('noimg')
		}
		$('.ireview-modal iframe').attr('src', readLink);
		$('.ireview-bg').show();
	});

	//listType 모달 열기
	$('.listType .view_wrapper#imgBox').on('click', function(e) {
		var readLink = $(this).attr('data-link');
		$('.ireview-modal').show();
		$('.ireview-bg').show();
		$('.ireview-modal iframe').attr('src', readLink);
	});

	//모달 bg 열기
	$('.ireview-bg').on('click', function(e) {
		$(this).hide();
		$('.ireview-modal').hide();
		$('.ireview-modal iframe').attr('src', '');
	});

	//상품 없으면 상품정보영역 삭제	
	$('#iReview .tmbType .prd').filter(function(){ return $(this).outerHeight() <= 60; }).remove();
			
	/*상세 상단 고정*/
	$.ajax({
		url: $('.dtReview').attr('data-list'),
		type: 'GET',
		success: function(data) {
			var $data = $(data);
			var articles = $data.find('.rvlist');

			if (articles.length > 0) {
				$('.swiper-dtReview .swiper-wrapper')
					.empty()
					.append(articles);

				// ✅ 데이터 붙인 뒤에 Swiper 초기화
				new Swiper('.swiper-dtReview', {
					slidesPerView: 1,
					spaceBetween: 9,
					loop: true,
					navigation: {
						nextEl: '.dtReview .swiper-button-next',
						prevEl: '.dtReview .swiper-button-prev',
					},
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					breakpoints: {
						860: {
							slidesPerView: 2,
							spaceBetween: 14,
						},
						1280: {
							slidesPerView: 3,
							spaceBetween: 14,
						},
					},
				});
			} else {
				$('.dtReview').remove();
			}
		}
	});
			
	/*포토리뷰 모아보기*/
	$.ajax({
		url: $('.photoType').attr('data-list'),
		type: 'GET',
		success: function(data) {
			var $data = $(data);
			var articles = $data.find('.rvlist').filter(function() {
				if ($(this).find('.chk_file img').length > 0) {
					$(this).find('.chk_file').remove();
					return true; // 해당 article을 선택
				}
				return false; // 이미지가 없는 경우 제외
			}).slice(0, 20); // 상위 20개 선택
			if (articles.length > 0) {
				$('.photoType-swiper .swiper-wrapper').empty().append(articles);
			} else {
				$('#iReview .photoType').remove(); // articles가 없으면 #iReview .photoType 삭제
			}
		}
	});
	var swiper = new Swiper('.photoType-swiper', {
		slidesPerView: 5,
		slidesPerGroup: 5,
		spaceBetween: 6,
		speed: 200,
		autoplay: false,
		navigation: {
			nextEl: '.photoType .swiper-button-next',
			prevEl: '.photoType .swiper-button-prev',
		},
		breakpoints: {
			480: {
				slidesPerView: 6,
				slidesPerGroup: 6,
			},
			860: {
				slidesPerView: 7,
				slidesPerGroup: 7,
			},
			1280: {
				slidesPerView: 8,
				slidesPerGroup: 8,
			},
		},
	});
	
});
	
$(document).on('click', '.dtReview .rvlist', function(e) {
    var readLink = $(this).attr('data-link');
    $('.ireview-modal').show();
    $('.ireview-modal iframe').attr('src', readLink);
    $('.ireview-bg').show();
});
	
$(document).on('click', '.photoType .rvlist', function(e) {
    var readLink = $(this).attr('data-link');
    $('.ireview-modal').show();
    $('.ireview-modal iframe').attr('src', readLink);
    $('.ireview-bg').show();
});

