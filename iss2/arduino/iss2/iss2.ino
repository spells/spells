#include <Servo.h>

#define PIN_LED 13
#define PIN_KNOB 0

void setup()
{
  pinMode(PIN_LED, OUTPUT);
  digitalWrite(PIN_LED, 0);
  while (Serial);
}

void sendPacket(char device, char method, int payload)
{
  device = (device & 0x7F) | (method << 7);
  Serial.write(device);
  Serial.write((payload >> 8) & 0x0F);
  Serial.write(payload & 0x0F);
}

void loop()
{
  if (Serial.available() > 0)
  {
    int header = Serial.read() & 0xFF;
    char headerDevice = header & 0x7F;
    char headerMethod = header >> 7;
    if (headerDevice == 1 && headerMethod == 0)
    {
      int value = analogRead(PIN_KNOB);
      sendPacket(1, 1, value);
    }
    else if (headerDevice == 2 && headerMethod == 1)
    {
      int value = Serial.read();
      value = (value << 8) + Serial.read();
      digitalWrite(PIN_LED, value);
    }
  }
}

