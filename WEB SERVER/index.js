$('.slider-info').slick({
  infinite: false,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1
});
var slideIndex = 1;
$('.js-add-slide').on('click', function() {
  slideIndex++;
  $('.slider-info').slick('slickAdd','<div><h3>' + slideIndex + '</h3></div>');
});

