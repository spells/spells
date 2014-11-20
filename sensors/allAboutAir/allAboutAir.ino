#include <Wire.h>

#define VOC_ADDRESS 0xB5  // I2C address of iAQ-engine: 10110101

void setup() 
{
 Serial.begin(9600);
 Wire.begin();
 while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
 Serial.println("FUCK");
}

void loop() 
{
 // read the VOC value
 int VOCValue = readVOC();
 Serial.print("VOC Value: ");
 Serial.println(VOCValue);
 
 // wait for 5 seconds for next reading
 delay(5000);
}

///////////////////////////////////////////////////////////////////
// Function: int readVOC()
// Returns : VOC Value 
///////////////////////////////////////////////////////////////////
int readVOC()
{
 int voc_value = 0;
 Serial.println("1");
 Wire.beginTransmission(VOC_ADDRESS);
 Wire.write(0);
 Wire.endTransmission();
 Serial.println("2");
 delay(20);
  
 Wire.requestFrom(VOC_ADDRESS, 2);
 byte i = 0;
 byte buffer[2] = {0, 0};
 Serial.println("3"); 
 while(Wire.available()){
   Serial.write(Wire.read());
   //buffer[i] = Wire.read();
   //i++;
 }
 Serial.println("4");
 
 voc_value = (int) buffer[0]<<8 | buffer[1];
 return voc_value;
}
