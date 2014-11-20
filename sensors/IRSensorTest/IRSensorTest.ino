
const int buttonPin = 2;
int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 13;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor
int count = 0;

void setup() {
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);  
  pinMode(buttonPin, OUTPUT);
  digitalWrite(buttonPin, HIGH);
  Serial.begin(9600);
}

void loop() {
  count++;
  // read the value from the sensor:
  digitalWrite(buttonPin, LOW);
  delay(15);
  sensorValue = analogRead(sensorPin); 
  delay(10); 
  digitalWrite(buttonPin, HIGH);  
  // turn the ledPin on
  digitalWrite(ledPin, HIGH);  
  Serial.print(sensorValue);
  Serial.print(" || ");  
  delay(5);  
  if(count==20) {
    count=0;
    Serial.println();
  }
}
