int buser = 4;    // buzzer pin
int haba = 75;     // for tone length
int mababa = 220; // the lowest frequency value to use
int mataas = 2700; //  the highest...
int patuto = 4;    // the limit
int pambilang;     // counter
int liyabe;        // switch
 
void setup()
{
  pinMode(buser, OUTPUT);
  pinMode(13, OUTPUT);
}
 
void loop()
{
  // pambilang++;
  liyabe = 1 - liyabe;
  digitalWrite(13, liyabe);
  // increasing tone
  for (int m = mababa; m<=mataas; m++)
  {
    tone (buser, m, haba);
  }
  // decreasing tone
  for (int m = mataas; m>=mababa; m--)
  {
    tone (buser, m, haba);
  }
  if(pambilang==patuto)
  {
    noTone(buser);
    delay(5000);
    pambilang = 0;
  }
}
