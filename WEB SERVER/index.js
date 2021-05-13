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
const functions = firebase.functions;
firebase.initializeApp(firebaseConfig);
var database=firebase.database();


$('.slider-info').slick({
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  arrows: false
});

var slideIndex = 1;
var deviceName;
var devices=[];
var deviceStates=[];
var stateDevice;
var numberDevices;

function updateData(){
    for(var i=0; i<devices.length; i++){
      database.ref('devices/' + devices[i]).on('value',(snapshot)=>{
        devices[snapshot.val().id-1]=snapshot.val().name;
        deviceStates[snapshot.val().id-1]=snapshot.val().state;
        app.datalist[snapshot.val().id-1]=
        {
          index: snapshot.val().id,
          name: devices[snapshot.val().id-1],
          state: deviceStates[snapshot.val().id-1]
        }
      });
    }
}

var deviceName;
$('.js-add-slide').on('click', function() {
  event.preventDefault();
  if(deviceName!=""){
    if(devices.length<1){
      deviceName = document.getElementById("deviceName").value;
      devices.push(deviceName);
      deviceStates.push(false);
        database.ref('devices/'+deviceName).set({
            id:devices.length,
            name:deviceName,
            state: false
        });
        app.datalist.push(
          {
            index: devices.length,
            name: deviceName,
            state: false
          })
        console.log(Boolean(stateDevice));
        // $('.slider-info').slick('slickAdd','<li><h3>'+app.datalist[devices.length-1].name+'</br>'+ app.datalist[devices.length-1].state+'</h3></li>');
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
      renderComponent: true 
    },
    methods: {
      forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;
        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      }
    }
  
});

setInterval(function(){
    updateData();
    app.forceRerender();
}, 1000)