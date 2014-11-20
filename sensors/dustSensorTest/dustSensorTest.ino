#include <SoftwareSerial.h>
#define moleOfGasConvFactor 24.45
#define MoleWeightAir       28.97

SoftwareSerial mySerial(10, 11); // RX, TX
byte data[24] = {0};
int count = 0;
float ret03,ret25,ret100,ret = 0;

void setup()  
{
  Serial.begin(57600);
  while (!Serial) {
    ; 
  }
  Serial.println("Serial in");
  mySerial.begin(9600);
  //while(!mySerial.available()){
    /*mySerial.write(0x11);
    mySerial.write(0x01);
    mySerial.write(0x1F);
    mySerial.write(0xCF);*/
      // - serial number
    /*mySerial.write(0x11);
    mySerial.write(0x03);
    mySerial.write(0x0C);
    mySerial.write(0x02);
    mySerial.write(0x1E);
    mySerial.write(0xC0);*/
    //delay(45000);
      // - open command
    /*mySerial.write(0x11);
    mySerial.write(0x01);
    mySerial.write(0x0B);
    mySerial.write(0xE3);*/
      // - read the result
   // Serial.println("have some response FGS");
    //delay(1000);
  //}
  Serial.println("enter!");
  
}

void loop() // run over and over
{
    mySerial.write(0x11);
    mySerial.write(0x03);
    mySerial.write(0x0C);
    mySerial.write(0x02);
    mySerial.write(0x1E);
    mySerial.write(0xC0);
    delay(45000);
    mySerial.write(0x11);
    mySerial.write(0x01);
    mySerial.write(0x0B);
    mySerial.write(0xE3);
  while (mySerial.available()){
    //Serial.print(mySerial.read(),16);
    data[count] = mySerial.read();
    Serial.print("|-");
    Serial.print(data[count],16);
    Serial.print("-|");
    count++;
    if(count==24)break;
    delay(500);
    
  }
  Serial.println("");
  for(int i = 0; i<24; i++){
    Serial.print(data[i],16);
    Serial.print(" ");
    delay(50);
  }
  ret03  = (0.00015*(data[7]*256*256*256+data[8]*256*256+data[9]*256+data[10]));
  ret25  = (0.3*(data[11]*256*256*256+data[12]*256*256+data[13]*256+data[14]));
  ret100 = (15*(data[15]*256*256*256+data[16]*256*256+data[17]*256+data[18]));
  ret    = ret03+ret25+ret100;
  Serial.println("");
  Serial.print(ret);
  Serial.println("ug/m^3");
  Serial.print(ret*24.45/28.97);
  Serial.println("ppm");
  
  delay(2000);
}

