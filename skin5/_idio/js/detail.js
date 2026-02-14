function startCountdown() {
    setInterval(function() {
        $('.timesale').each(function() {
            var timeText = $(this).text().replace(/[^0-9]/g, '');
            var days = parseInt(timeText.slice(0, timeText.length - 6));
            var hours = parseInt(timeText.slice(timeText.length - 6, timeText.length - 4));
            var minutes = parseInt(timeText.slice(timeText.length - 4, timeText.length - 2));
            var seconds = parseInt(timeText.slice(timeText.length - 2));
            var totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
            if (totalSeconds > 0) {
                totalSeconds -= 1;
                days = Math.floor(totalSeconds / (24 * 60 * 60));
                hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
                minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                seconds = totalSeconds % 60;
                var newTimeText = '<i class="fa-regular fa-clock"></i> <span class="nam">남은시간</span> ' + 
                    days + '<span>일</span> ' + 
                    ('0' + hours).slice(-2) + ':' + 
                    ('0' + minutes).slice(-2) + ':' + 
                    ('0' + seconds).slice(-2);
                $(this).html(newTimeText);
            }
        });
    }, 1000);
}

$(document).ready(function(){	
	const $dtlItems = $('.dtl_item');
	if ($dtlItems.length === 0) {
		$('.dtl_item').closest('table').remove();
	} else {
		$dtlItems.each(function () {
			const $row = $(this);
			const itemTit = $row.find('th > span').text().trim();
			const itemCont = $row.find('td').html();
			const $itemName = $('.headingArea .name');
			const $itemPrice = $('.headingArea .prc');
			const $itemRating = $('.headingArea .rating');
			switch (itemTit) {
				case '상품명':
					$itemName.prepend(itemCont);
					$row.remove();
					break;
				case '영문상품명':
					$row.find('td > span').addClass('eng_name');
					$itemName.before(`<div class="eng_name">${itemCont}</div>`);
					$row.remove();
					break;
				case '상품 요약설명':
				case '상품요약설명':
				case '상품요약정보':
					$itemName.after(`<div class="desc summary">${itemCont}</div>`);
					$row.remove();
					break;
				case '상품 간략설명':
				case '상품간략설명':
					$itemPrice.before(`<div class="desc simple">${itemCont}</div>`);
					$row.remove();
					break;
				case '할인판매가':
					$row.closest('.infoArea').addClass('promotion');
					break;
				case '할인 기간':
				case '할인기간':
					const $promoDate = $('.product_promotion_date');
					$promoDate.clone().appendTo('.prc .timesale');
					$promoDate.parent('span').remove();
					$('.period').removeClass('period');
					$row.remove();
					let promoText = $('.imgArea .timesale .product_promotion_date').text()
						.replace('남은시간', '<i class="fa-regular fa-clock"></i> <span class="nam">남은시간</span>')
						.replace('일', '<span>일</span>');
					$('.imgArea .timesale').html(promoText).attr('id', 'countdown');
					if (typeof startCountdown === 'function') {
						startCountdown();
					}
					break;
				case '사용후기':
					$('.headingArea .rating_box').addClass('on');
					$itemRating.prepend(itemCont);
					$row.remove();
					break;
			}
		});
	}	
	function paddingOpt() {
		$('tr.option').closest('table').closest('td').css('padding', 0);
	}
	function noOpt() {
		$('#totalProducts table').each(function () {
			if ($(this).height() == 0) {
				$(this).closest('td').css('padding', 0);
			}
		});
	}
    var spanHeight = $('.name > span:first-child').height();
    $('.name .btn_wish i').css('line-height', spanHeight + 'px');
	paddingOpt();
	noOpt();
	$('.infoArea').click(function () {
		setTimeout(paddingOpt, 300);
		setTimeout(noOpt, 300);
	});	
	$('.icon img[src*="ico_product_soldout.gif"]').remove();	
	$.ajax({
		url: $('.btn_write').attr('href'),
		type: 'GET',
		success: function(data) {
			var $data = $(data);
			var totalScore = 0;
			var totalCount = 0;
			var scoreCounts = {
				0: 0,
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0
			};
			$data.find('.score').each(function() {
				var text = $(this).text().trim();
				var score = parseInt(text, 10);

				if (!isNaN(score) && score >= 0 && score <= 5) {
					totalScore += score;
					totalCount++;
					scoreCounts[score]++;
				}
			});
			var average = totalCount > 0 ? totalScore / totalCount : 0;
			var displayAverage = (average % 1 === 0)
				? average
				: Math.round(average * 100) / 100;
			var percentage = (average / 5) * 100;
			$('.rating_box .stars-foreground').css('width', percentage + '%');			
			var roundedAverage = Math.round(average * 10) / 10;
			$('.rating_box .rt-score').text(roundedAverage);
			$('.rv-aver').text(displayAverage);
			if (totalCount === 0) {
				$('.review-score .score').html('<span class="no-review">-</span>');
				$('.review-count .rv-count').html('<span class="no-review">-</span>');
			} else {
				$('.rv-aver').text(displayAverage);
			}
			for (var i = 1; i <= 5; i++) {
				var count = scoreCounts[i];
				var percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
				$('.rv-bar' + i).css('width', percent + '%');
			}
		}
	});	
});

$(window).on('load', function () {
	const $dtl = $('.dtlArea');
	const height = $dtl.outerHeight();
	if (height < 45) {
		$dtl.remove();
	} else {
		$dtl.addClass('topborder');
	}
	if ($('.prdOption').height() < 5) {
		$('.fixOpt_btn').addClass('noopt');
	}
});

$(function () {
	const $body = $('body');
	function updateMarginClass() {
		const $targets = $('.infoArea_wrapper > *');
		$targets.removeClass('pcmargin momargin');
		if ($body.hasClass('pc')) {
			$targets.each(function () {
				if ($(this).outerHeight() >= 5) {
					$(this).addClass('pcmargin');
				}
			});
		} else if ($body.hasClass('mo')) {
			$targets.each(function () {
				if ($(this).outerHeight() >= 5) {
					$(this).addClass('momargin');
				}
			});
		}
	}
	function removeSingleImageList() {
		if ($body.hasClass('pc')) {
			const $list = $('.xans-product-detail .imgArea .listImg ul.list');
			if ($list.length && $list.find('li').length === 1) {
				$list.remove();
			}
		}
	}
	function runAll() {
		updateMarginClass();
		removeSingleImageList();
	}
	runAll();
	if ($body.hasClass('mo')) {
		$('#btn_talk').addClass('pb');
	}
});

$(function () {
    var $window = $(window);
    var $detail = $('.xans-product-detail');
    var $infoArea = $('.infoArea');
    var $infoBtn = $('.infoArea_btn');
    var isFixed = false;
    function checkScroll() {
        var detailBottom = $detail.offset().top + $detail.outerHeight();
        var scrollTop = $window.scrollTop();
        if (scrollTop >= detailBottom) {
            if (!isFixed) {
                isFixed = true;
                $infoArea.hide().removeClass('open fixed');
                $infoBtn.addClass('fixed').fadeIn();
            }
        } else {
            if (isFixed) {
                isFixed = false;
                $infoBtn.removeClass('fixed').hide();
                $infoArea.removeClass('fixed').show();
            }
        }
    }
    $infoBtn.on('click', function () {
        if (!isFixed) return;
        $infoArea.toggleClass('open').toggle();
        if ($infoArea.hasClass('open')) {
            $infoArea.addClass('fixed');
            $infoBtn.addClass('active');
        } else {
            $infoArea.removeClass('fixed');
            $infoBtn.removeClass('active');
        }
    });
    $window.on('scroll resize', checkScroll);
    checkScroll();
});