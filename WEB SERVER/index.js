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
var deviceName;

$('.js-add-slide').on('click', function() {
  event.preventDefault();
  slideIndex++;
  deviceName = document.getElementById("deviceName").value;
  $('.slider-info').slick('slickAdd','<div><h3>' + deviceName + '</h3></div>');
  closeForm();
  document.getElementById("deviceName").value=null;
});

$('.js-remove-slide').on('click', function() {
  $('.slider-info').slick('slickRemove',slideIndex - 1);
  if (slideIndex !== 0){
    slideIndex--;
  }
});

