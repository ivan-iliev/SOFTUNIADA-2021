#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <FirebaseESP8266.h>

#define WIFI_SSID "VIVANETBG.COM"                                          
#define WIFI_PASSWORD "aresfrend13"
#define FIREBASE_HOST "softuniada.firebaseio.com"
#define FIREBASE_AUTH "KzfawSV3h0yYPtRYy76h8E1plrD4pVaI0ida6wXr"
FirebaseData firebaseData;

//hardwear
#define PIN_TO_SENSOR D2
#define LED_pin D3
int curr = LOW;
int prev = LOW;

//time
const long offset = 10800;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", offset);
  
void setup() {
  //pins
  pinMode(PIN_TO_SENSOR, INPUT);
  pinMode(LED_pin, OUTPUT);
  //dataBase
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  timeClient.begin();

//  if (Firebase.pushInt(firebaseData, "/", 10))
//    {
//      Serial.println("PASSED");
//      Serial.println("PATH: " + firebaseData.dataPath());
//      Serial.print("PUSH NAME: ");
//      Serial.println(firebaseData.pushName());
//      Serial.println("ETag: " + firebaseData.ETag());
//      Serial.println("------------------------------------");
//      Serial.println();
//    }
}

String pathForDevice="/device";
String timeStamp;
String formattedTime;
void loop() {
  //get time
  formattedTime = timeClient.getFormattedTime();
  int splitT = formattedTime.indexOf("T");
  timeStamp = formattedTime.substring(splitT+1, formattedTime.length());
  //
  prev = curr;
  curr = digitalRead(PIN_TO_SENSOR);
  
  if (prev == LOW && curr == HIGH) {
    Serial.println("Motion detected!");
    digitalWrite(LED_pin, HIGH);
    timeClient.update();
    
    FirebaseJson updateData;
    updateData.set("state", true);
    if (Firebase.updateNode(firebaseData, pathForDevice, updateData))
    {
      Serial.println("UPDATED");
      if (Firebase.pushString(firebaseData, pathForDevice+"/timeStamps", timeStamp))
      {
        Serial.println("TIME STAMP:  "+timeStamp);
      }
    }else {
      Serial.println(firebaseData.errorReason());
    }
  }
  else
  if (prev == HIGH && curr == LOW) {
    Serial.println("Motion stopped!");
    digitalWrite(LED_pin, LOW);
    
    FirebaseJson updateData;
    updateData.set("state", false);
    if (Firebase.updateNode(firebaseData, pathForDevice, updateData))
    {
      Serial.println("UPDATED");
    }else {
      Serial.println(firebaseData.errorReason());
    }
  }
}
