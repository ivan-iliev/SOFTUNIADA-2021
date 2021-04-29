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

var slideIndex = 1;
var deviceName;
var devices=[];
var stateDevice;
function updateData(){
    database.ref('devices/' + deviceName).on('value',(snapshot)=>{
        stateDevice=snapshot.val().state;
        app.state=Boolean(stateDevice);
        console.log(Boolean(stateDevice));
    });
}

$('.js-add-slide').on('click', function() {
  event.preventDefault();
  deviceName = document.getElementById("deviceName").value;
  if(deviceName!=""){
    slideIndex++;
    if(devices.length<5){
        database.ref('devices/' + deviceName).set({
            state: false
        });
        console.log(Boolean(stateDevice));
        devices.push(deviceName);
        closeForm();
    }else{
      alert("You can not add a new device right now!");
    }
  }
});

var app = new Vue({
    el: '#app',
    data: {
        name: String(deviceName),
        state: false
    }
})

setInterval(function(){
    updateData();
}, 1000)