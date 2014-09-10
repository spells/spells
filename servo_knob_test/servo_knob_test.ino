#include <Servo.h>

Servo servo;

int val;

void setup()
{
  servo.attach(9);
}

void loop()
{
  int val = analogRead(0);
  val = map(val, 30, 795, 20, 159);
  servo.write(val);
}

