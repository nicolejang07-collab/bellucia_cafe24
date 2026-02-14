var swiper = new Swiper('.topBnr-swiper', {
	effect: 'slide',
	centeredSlides: true,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
});

$(function() {
  if ($('body').attr('id') !== 'main') {
    $('#topBnr').removeAttr('data-aos').removeAttr('data-aos-delay');
  }
  AOS.init();
});