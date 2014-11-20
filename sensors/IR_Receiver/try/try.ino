/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */
#define centerErrorTolerance 2  //count
#define errorTolerance       50 //%
 
int count = 0;
int count_two = 0;
int count_temp = 0;
int count_period = 0;
int state = 0;
int record_state = 0;
int pre_record = 0;
int count_data = 0;
int data_need_state = 0;

int data[15] = {0};
int test[700] = {0};
/*500,500,500,500,500,500,0,0,0,0,0,0,0,
500,500,500,500,500,500,0,0,0,0,0,0,0,
500,500,500,500,500,500,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
};*/
int temp[100] = {0};

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  delay(500);
  Serial.println("gogo");
  delay(500);
}

// the loop routine runs over and over again forever:
void loop(){
  if(!data_need_state){
    for(int i=0; i<400; i++){
      test[i] = analogRead(A0);
      delay(15);
    }
    for(int i=0; i<400; i++){
      count++;
      Serial.print(test[i]);
      Serial.print(" ");
      delay(25);
      if(count>40) {
        count=0;
        Serial.print(i);
        Serial.println(" ");
      }
    }
    count=0;
    data_need_state = 1;
  }
  count++;
  if((state == 0) & (test[count] > 100)){
    if(test[count+1] <= 100) state = 1;
    temp[count_two] = test[count];
    count_two++;
  }
  if(state == 1 & (test[count] < 70)){
    count_temp++;
    if(test[count+1] >= 70) state = 2;
    temp[count_two] = test[count];
    count_two++;
  }
  if(state == 2 & (test[count] > 100)){
    count_period = count_two;
    state = 0;
    count_two = 0;
 
    if(pre_record == 3){
      Serial.print("count = ");
      Serial.println(count);
      Serial.println("pre=3");
      record_state = 1;
    }
    else if((((int)(count_period - count_temp+centerErrorTolerance))>count_temp) 
            & ((count_period - count_temp)<(int)(centerErrorTolerance+count_temp))){
        /*Serial.print("count_period = ");
        Serial.println(count_period);
        Serial.print("count_temp = ");
        Serial.println(count_temp);      
        Serial.print("count = ");
        Serial.println(count);  */    
        pre_record++;
        count_temp = 0;
    }
    else{
      pre_record = 0; 
      /*
      Serial.print("!!!");
      Serial.print("count_period = ");
      Serial.println(count_period);
      Serial.print("count_temp = ");
      Serial.println(count_temp);
      Serial.print("count = ");
      Serial.println(count); 
      */
      count_temp = 0;
    }
  }

  if(record_state == 1){
    (int)((0.01*errorTolerance*(count_period - count_temp)))>count_temp?
           data[count_data]=1:data[count_data]=2;
    count_data++;
    count_temp = 0;
    count_period = 0;
    record_state = 0;
    if(count_data == 5){
      count_data = 0;
      record_state = 0;
      Serial.print("Data is ");
      for(int i=0;i<10;i++){
        Serial.print(data[i]);
      }
      /*for(int i=0;i<count;i++){
        Serial.print(test[i]);
        Serial.print("|");
        delay(20);
      }*/
      Serial.println(" ");
     //while(1);
    }
  }
  if(count>400){
    count = 0;
    pre_record = 0;
    data_need_state = 0;
    count_data = 0;
    count_temp = 0;
    for(int i=0;i<10;i++){
      data[i]=0;
    }
  }
  /*
  Serial.print("count : ");
  Serial.print(count);
  Serial.print(" || ");*/
  /*Serial.print("count_two : ");
  Serial.print(count_two);
  Serial.print(" || ");
  Serial.print("state : ");*/
  //Serial.print(state);
  /*Serial.print(" || ");
  Serial.print("pre_record : ");
  Serial.print(pre_record);
  Serial.print(" || ");
  Serial.print("count_data : ");
  Serial.print(count_data);
  Serial.print(" || ");
  Serial.print("count_period : ");
  Serial.print(count_period);
  Serial.print(" || ");
  Serial.print("count_temp : ");
  Serial.print(count_temp);*/
  /*
  Serial.print(" || ");
  Serial.print("data : ");
  for(int i=0;i<15;i++){
    Serial.print(data[i]);
  }*/
  /*
  if(count==30)Serial.println("ma");
  if(count==60)Serial.println("ma");
  if(count==90)Serial.println("ma");
  if(count==120)Serial.println("ma");
  if(count==150)Serial.println("ma");
  if(count==180)Serial.println("ma");
  if(count==210)Serial.println("ma");
  if(count==240)Serial.println("ma");
  if(count==270)Serial.println("ma");
  if(count==300)Serial.println("ma");
  if(count==330)Serial.println("ma");
  if(count==360)Serial.println("ma");
  if(count==390)Serial.println("ma");
  */
}
