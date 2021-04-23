$('.slider-info').slick({
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1
});
var slideIndex = 1;
$('.js-add-slide').on('click', function() {
  slideIndex++;
  $('.slider-info').slick('slickAdd','<div><h3>' + slideIndex + '</h3></div>');
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}