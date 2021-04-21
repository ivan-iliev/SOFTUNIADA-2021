$(document).ready(function(){
      $('.your-class').slick({
        slidesToShow: 3,
        slidesToScroll: 3
    });
    var slideIndex = 1;
    $('.add').on('click', function() {
        slideIndex++;
        $('.your-class').slick('slickAdd','<div><h3>' + slideIndex + '</h3></div>');
      });
      


    });

