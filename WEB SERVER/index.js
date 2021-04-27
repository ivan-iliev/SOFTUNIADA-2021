const firebaseConfig = {
  apiKey: "AIzaSyDaF6_wkqRd0vpL4Yocz1Lv8sj0oAHUFKM",
  authDomain: "softuniada.firebaseapp.com",
  databaseURL: "https://softuniada.firebaseio.com",
  projectId: "softuniada",
  storageBucket: "softuniada.appspot.com",
  messagingSenderId: "42389912385",
  appId: "1:42389912385:web:3b7ae948c63edb6fd07fc0",
  measurementId: "G-Y871DLTECD"
};
firebase.initializeApp(firebaseConfig);
var database=firebase.database();

$('.slider-info').slick({
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1
});
var slideIndex = 1;
var deviceName;
var devices=[];

$('.js-add-slide').on('click', function() {
  event.preventDefault();
  deviceName = document.getElementById("deviceName").value;
  if(deviceName!=""){
    slideIndex++;
    if(devices.length<5){
      database.ref('devices/' + deviceName).set({
        state: false
      });
      devices.push(deviceName);
      $('.slider-info').slick('slickAdd','<div><h2>' + deviceName + '</h2></div>');
      closeForm();
    }else{
      alert("You can not add a new device right now!");
    }
  }
});

$('.js-remove-slide').on('click', function() {
  $('.slider-info').slick('slickRemove',slideIndex - 1);
  if (slideIndex !== 0){
    slideIndex--;
  }
});