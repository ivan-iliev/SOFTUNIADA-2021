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

void setup() {
  pinMode(PIN_TO_SENSOR, INPUT);
  pinMode(LED_pin, OUTPUT);
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

//  if (Firebase.pushInt(firebaseData, "/pishkaHui", 10))
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

void loop() {
  // put your main code here, to run repeatedly:
  prev = curr; // store old state
  curr = digitalRead(PIN_TO_SENSOR);   // read new state

  if (prev == LOW && curr == HIGH) {
    Serial.println("Motion detected!");
    digitalWrite(LED_pin, HIGH);
    
    FirebaseJson updateData;
    updateData.set("boole", true);
    if (Firebase.updateNode(firebaseData, "/", updateData))
    {
      Serial.println("UPDATED");
    }else {
      Serial.println(firebaseData.errorReason());
    }
  }
  else
  if (prev == HIGH && curr == LOW) {
    Serial.println("Motion stopped!");
    digitalWrite(LED_pin, LOW);
    
    FirebaseJson updateData;
    updateData.set("boole", false);
    if (Firebase.updateNode(firebaseData, "/", updateData))
    {
      Serial.println("UPDATED");
    }else {
      Serial.println(firebaseData.errorReason());
    }
  }
}
