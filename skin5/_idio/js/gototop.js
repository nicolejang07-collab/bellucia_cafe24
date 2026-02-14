$(window).scroll(function(){	
	if($(document).scrollTop() > 500) {
		$('#scrollTop').addClass('on');
	} else {
		$('#scrollTop').removeClass('on');
	}
});