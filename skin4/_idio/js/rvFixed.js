$('.rvFixed-slider .cont').each(function() {
	var cont = $(this).text();
	$(this).text(cont);
});

function rvSlider(){
	$('.rvFixed-slider').slick({
		dots: true,
		autoplay: true,
		pauseOnHover: false,
		pauseOnFocus: false,
		autoplaySpeed: 3000,
		arrows: false,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1
	});
}

var rvLen = $('.rvSlide').children('li').length;
if(rvLen > 4){
	rvSlider();
}