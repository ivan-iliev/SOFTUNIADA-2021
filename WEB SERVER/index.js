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

Vue.use(VueCarousel);
$('.slider-info').slick({
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  arrows: false,
});
var slideIndex = 1;
var deviceName;
var devices=[];
var deviceStates=[];
var stateDevice;
function updateData(){
    for(var i=0; i<devices.length; i++){
        database.ref('devices/' + devices[i]).on('value',(snapshot)=>{
        devices[snapshot.val().id]=snapshot.val().name;
        deviceStates[snapshot.val().id]=snapshot.val().state;
        app.datalist[snapshot.val().id]=
        {
          index: new Int16Array(snapshot.val().id),
          name: new String(devices[snapshot.val().id]),
          state: new Boolean(devices[snapshot.val().id]),
        }
        console.log(Boolean(deviceStates[snapshot.val().id]));
      });
    }
}

var deviceName;
$('.js-add-slide').on('click', function() {
  event.preventDefault();
  deviceName = document.getElementById("deviceName").value;
  devices.push(deviceName);
  deviceStates.push(false);
  if(deviceName!=""){
    if(devices.length<10){
        database.ref('devices/'+deviceName).set({
            id:devices.length,
            name:deviceName,
            state: false
        });
        app.datalist.push(
          {
            index: new Int16Array(devices.length),
            name: new String(deviceName),
            state: new Boolean(false),
            style:{
              'display': 'inline-block',
              'background': 'rgb(37, 37, 37)',
              'color': "#9c27b0",
              'height': "400px",
              'width': '23.5%',
              'line-height': "80px",
              'margin-bottom': "2%",
              'margin-left': "40px",
              'position':"relative",
              'text-align': "center",
              'border-radius': "5px"
            }
          })
        console.log(Boolean(stateDevice));
        $('.slider-info').slick('slickAdd','<div><h3>' + deviceName + '</h3></div>');
        closeForm();
    }else{
      alert("You can not add a new device right now!");
    }
  }
});

var app = new Vue({
    el: '#app',
    data:{
      datalist:[],
      options: {
        currentPage: 0,
        infinite: 4,
        slidesToScroll: 4,
        loop: true
      }
    }
});

setInterval(function(){
    updateData();
}, 10000)