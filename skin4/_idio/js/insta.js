$(document).ready(function() {
	
    // iframe 높이 조정
    var iframe = $('iframe.snapwidget-widget');
    iframe.on('load', function() {
        var newHeight = iframe.contents().find('html').height();
        iframe.height(newHeight);
    });
	
    // 링크 연결
    var username = $('.insta .insta-tit p').text().trim();
    var instagramUrl = 'http://www.instagram.com/' + username + '/';
    $('.gotoinsta').attr('href', instagramUrl);

});