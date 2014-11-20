/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */
#define centerErrorTolerance 11  // 대략이정도 count => 0.15*signal period/sampling period
#define errorTolerance       50 //% 대략이정도 duty difference/3
 
int count = 0;
int count_two = 0;
int count_temp = 0;
int count_period = 0;
int state = 0;
int record_state = 0;
int pre_record = 0;
int count_data = 0;
int data_need_state = 0;
int count_center = 0;

int data[15] = {0};
int test[1000] = {0};
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
    Serial.println("getting data...");
    for(int i=0; i<999; i++){
      test[i] = analogRead(A0);
      //Serial.println(test[i]);
      delay(8);
    }
    Serial.println("done!");
    data_need_state = 1;
    delay(500);
  }
  count++;
  if((state == 0) & (test[count] > 100)){
    if(test[count+1] < 100) state = 1;
    temp[count_two] = test[count];
    count_two++;
  }
  if(state == 1 & (test[count] < 100)){
    count_temp++;
    if(test[count+1] > 100) state = 2;
    temp[count_two] = test[count];
    count_two++;
  }
  if(state == 2 & (test[count] > 100)){
    count_period = count_two;
    state = 0;
    count_two = 0;
    if(pre_record == 3){
      //Serial.print("count = ");
      //Serial.println(count);
      //Serial.println("pre=3");
      record_state = 1;
    }
    else if((((int)(count_period - count_temp+centerErrorTolerance))>count_temp) 
            & ((count_period - count_temp)<(int)(centerErrorTolerance+count_temp))){
      //Serial.print("###########count_period = ");
      //Serial.println(count_period);
      //Serial.print("count_temp = ");
      //Serial.println(count_temp);      
      //Serial.print("count = ");
      //Serial.println(count);    
      count_center++;
      pre_record++;
      count_temp = 0;
    }
    else{
      pre_record = 0; 
      count_temp = 0;
      //Serial.print("!!!");
      //Serial.print("count_period = ");
      //Serial.println(count_period);
      //Serial.print("count_temp = ");
      //Serial.println(count_temp);
      //Serial.print("count = ");
      //Serial.println(count); 
    }
  }

  if(record_state == 1){
    (int)((0.01*errorTolerance*(count_period - count_temp)))>count_temp?
           data[count_data]=1:data[count_data]=2;
    count_data++;
    count_temp = 0;
    count_period = 0;
    record_state = 0;
    if(count_data == 3){
      
      Serial.print("Data is ");
      for(int i=0;i<count_data;i++){
        Serial.print(data[i]);
      }
      count_data = 0;
      record_state = 0;
      pre_record = 0;
      count_temp = 0;
      //for(int i=0;i<count;i++){
      //  Serial.print(test[i]);
      //  Serial.print("|");
      //  delay(20);
      //}
      Serial.println(" ");
     //while(1);
    }
  }
  if(count>950){
    for(int i=0;i<count;i++){
      test[i]=0;
    }
    count = 0;
    pre_record = 0;
    data_need_state = 0;
    count_data = 0;
    count_temp = 0;
    count_center = 0;
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
  }
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
  if(count==390)Serial.println("ma");*/
  delay(5);
}
