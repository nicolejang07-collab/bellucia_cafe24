$(function () {
  // 가격 숫자 추출 + 해당 요소의 부모 HTML과 요소 자체 반환
  const extractPrice = (selector) => {
    const $el = $(selector);
    let text = '';

    // .contents()로 자식 요소들 포함한 모든 텍스트 가져오기
    $el.contents().each(function () {
      if (this.nodeType === 3) { // 텍스트 노드만 추출
        text += this.nodeValue; // 텍스트 값을 합침
      } else if (this.nodeType === 1 && $(this).is('strike')) { // strike 태그 처리
        text += $(this).text(); // strike 안의 텍스트도 가져옴
      }
    });

    // 쉼표, 화폐 단위, \ 등 숫자 이외 문자 제거
    text = text.trim().replace(/[^0-9]/g, ''); // 숫자만 추출

    const price = text ? parseInt(text, 10) : null;

    return { price, html: $el.parent().prop('outerHTML'), $el }; // $el로 수정
  };

  // 각 항목 추출
  const retail = extractPrice('#span_product_price_custom'); // 소비자가
  const regular = extractPrice('#span_product_price_text'); // 판매가 (항상 존재)
  const sale = extractPrice('#span_product_price_sale'); // 할인판매가

  let discountRate = null;
  let fontSize = null;

  // 사용된 가격 행 제거
  const removeRows = (...items) => items.forEach(i => i?.$el.parents('.dtl_item').remove());

  if (sale.price) {
    // 조건 1: 할인판매가 존재 → 판매가 기준 할인율
    discountRate = Math.round((1 - sale.price / regular.price) * 100);
    $('.pPrice').html(regular.html);
    $('.pSale').html(sale.html);
    fontSize = sale.$el.css('font-size');
    removeRows(sale, regular);

  } else if (retail.price) {
    // 조건 2-1: 할인판매가 없음 + 소비자가 존재 → 소비자가 기준 할인율
    discountRate = Math.round((1 - regular.price / retail.price) * 100);
    $('.pPrice').html(retail.html);
    $('.pSale').html(regular.html);
    fontSize = regular.$el.css('font-size');
    removeRows(retail, regular);

  } else {
    // 조건 2-2: 할인판매가, 소비자가 모두 없음 → 할인율 계산 안함
    $('.pSale').html(regular.html);
    removeRows(regular);
    return;
  }

  // 공백 제거
  $('.pSale').find('*').each(function () {
    $(this).text($(this).text().replace(/\s+/g, ''));
  });

  // 할인율 표시 및 폰트 크기 적용
  if (discountRate > 0) {
    $('.sale_box').text(`${discountRate}%`).css('font-size', fontSize);
  }
});
