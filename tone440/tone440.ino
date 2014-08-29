void setup() {
  pinMode(4, OUTPUT);
}

void loop() {
  for (;;) {
    digitalWrite(4, HIGH);
    delayMicroseconds(1136);
    digitalWrite(4, LOW);
    delayMicroseconds(1136);
  }
}

