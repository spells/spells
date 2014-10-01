void setup() {
  pinMode(4, OUTPUT);
}

void loop() {
  for (;;) {
    // 440Hz 톤의 주기는 2272.73us입니다.
    digitalWrite(4, HIGH);
    delayMicroseconds(1136);
    digitalWrite(4, LOW);
    delayMicroseconds(1136);
  }
}

