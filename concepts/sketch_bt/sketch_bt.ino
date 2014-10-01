
// 온 보드 LED 켜짐 상태 토글
volatile char ledStatus;
void toggle()
{
  ledStatus = !ledStatus;
  digitalWrite(13, ledStatus);
}

void setup()
{
  pinMode(13,OUTPUT);

  Serial1.begin(9600);
  while (!Serial1);
  Serial.begin(9600);
  while (!Serial);
  
  Serial1.print("AT");
}

void loop()
{
  toggle();
  Serial.println("SoMaSpells");
  for (;;)
  {
    while (Serial1.available() <= 0);
    Serial.write(Serial1.read());
  }
}

