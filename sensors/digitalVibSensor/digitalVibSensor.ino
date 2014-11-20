
#define SensorINPUT   3
#define SensorLED    13
#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11);

int sensorOnOff, beforeSensorOnOff = 0;  
int count = 0;
int state = 0;

void setup() {
  pinMode(SensorINPUT, INPUT);
  pinMode(SensorLED, OUTPUT);
   attachInterrupt(1, blink, FALLING);
  Serial.begin(57600);
  while (!Serial) {
    ;
  }
  mySerial.begin(9600);
}

void loop() {
  sensorOnOff = digitalRead(SensorINPUT);    
  if(sensorOnOff != beforeSensorOnOff){
    count++;
    if(state){
      digitalWrite(SensorLED, LOW);
      state = 0;
    }
    else{
      digitalWrite(SensorLED, HIGH);
      state = 1;
    }
    delay(200);
  }
  Serial.println(count);
  
  if(count > 60000)
    count = 0;
   sensorOnOff = beforeSensorOnOff;
}
void blink()//Interrupts function
{
  state++;
}
/*
#define SensorLED     13
#define SensorINPUT   3  //Connect the sensor to digital Pin 3 which is Interrupts 1.
  
unsigned char state = 0;
  
void setup() 
{ 
  pinMode(SensorLED, OUTPUT); 
  pinMode(SensorINPUT, INPUT);
  attachInterrupt(1, blink, FALLING);// Trigger the blink function when the falling edge is detected
  
}
void loop()
{
      //noInterrupts();
      if(state != 0)
      {
        noInterrupts();
        digitalWrite(SensorLED,HIGH);
        delay(200);
        interrupts();
        state = 0;
      }  
      else
        digitalWrite(SensorLED,LOW);
} 
  
  
void blink()//Interrupts function
{
  state++;
}*/
