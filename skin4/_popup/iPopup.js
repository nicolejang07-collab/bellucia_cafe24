function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function couponClose() {
    $("#iPopupB").css("display", "none"); // 팝업 숨기기
}

$(function () {
    // 'close=N' 쿠키가 없으면 팝업을 표시
    if (document.cookie.indexOf("close=N") < 0) {
        $("#iPopupB").addClass('opened'); // 'opened' 클래스를 추가하여 팝업을 표시
    }

    // '닫기' 버튼을 클릭하면 팝업을 닫음
    $("#closePopup").click(function () {
        couponClose();
    });

    // '오늘 하루 열지 않음' 버튼을 클릭하면 쿠키를 설정하고 팝업을 닫음
    $("#dontShowAgain").click(function () {
        setCookie("close", "N", 1); // 쿠키를 1일로 설정
        couponClose();
    });
});

var swiper = new Swiper('.iPopup-swiper', {
	effect: 'slide',
	loop: true,
	autoHeight: false,
	autoplay: {
		delay: 5000,
	},
	navigation: {
		nextEl: '.iPopup .swiper-button-next',
		prevEl: '.iPopup .swiper-button-prev',
	},
	pagination: {
		el: '.iPopup .swiper-pagination',
		type: "fraction",
	},
});