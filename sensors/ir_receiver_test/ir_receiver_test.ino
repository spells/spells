int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 13;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor
int count = 0;
void setup() {
  // declare the ledPin as an OUTPUT:
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  while(!Serial){
    ;
  }  
}

void loop() {
  count++;
  // read the value from the sensor:
  sensorValue = analogRead(sensorPin);    
  // turn the ledPin on
  Serial.print(" ");
  Serial.print(sensorValue);
  delay(50);
  if(count>100){
   count = 0;
   Serial.println();
  }
}
