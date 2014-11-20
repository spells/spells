#include <SoftwareSerial.h>
SoftwareSerial mySerial(10, 11);

int sensorPin = A0;    
int sensorValue = 0;  

void setup() {

  Serial.begin(57600);
  while (!Serial) {
    ;
  }
  mySerial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);    
  Serial.println(sensorValue);
  delay(200);
}
//http://www.dfrobot.com/wiki/index.php/Analog_Sound_Sensor_SKU:_DFR0034
//제조사홈페이지가서 schematic 확인할것
//http://www.dfrobot.com/index.php?route=product/product&path=36_63&product_id=83
//devicemart product 설명은 구버젼이라 선배치바껴있음
