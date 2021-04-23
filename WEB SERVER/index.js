function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

$('.slider-info').slick({

  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1
});
var slideIndex = 1;
var deviceName = document.getElementById(deviceName);

$('.js-add-slide').on('click', function() {
  slideIndex++;
  $('.slider-info').slick('slickAdd','<div><h3>' + slideIndex + '</h3></div>');
  openForm();
});

$('.js-remove-slide').on('click', function() {
  $('.slider-info').slick('slickRemove',slideIndex - 1);
  if (slideIndex !== 0){
    slideIndex--;
  }
});

