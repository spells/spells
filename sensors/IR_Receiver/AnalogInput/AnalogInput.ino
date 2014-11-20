/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */
int count = 0;
int count_two = 0;
int count_temp = 0;
int count_period = 0;
int state = 0;
int record_state = 0;
int pre_record = 0;
int count_data = 0;

int data[15] = {0};
int test[400] = {
500,500,500,500,500,500,0,0,0,0,0,0,
500,500,500,500,500,500,0,0,0,0,0,0,
500,500,500,500,500,500,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,0,0,0,0,0,0,0,0,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
500,500,500,500,500,500,500,500,500,500,0,0,
};
int temp[100] = {0};

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  delay(3000);
  Serial.println("go!");
}

// the loop routine runs over and over again forever:
void loop(){
  count++;
  if((state == 0) & (test[count] > 100)){
    if(test[count+1] < 50) state = 1;
    temp[count_two] = test[count];
    count_two++;
  }
  if(state == 1 & (test[count] < 50)){
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
      Serial.println("data write");
      delay(200);
      record_state = 1;
      
    }
    else if(1 | (((int)(count_period - count_temp-2))>count_temp) & ((count_period - count_temp)<(int)(2+count_temp))){
      Serial.println("not yet");    
      pre_record++;
    }
  }

  if(record_state == 1){
    ((int)(0.5*(count_period - count_temp)))>count_temp?data[count_data]=1:data[count_data]=2;
    count_data++;
    count_temp = 0;
    count_period = 0;
    record_state = 0;
    if(count_data == 15){
      count_data = 0;
      record_state = 0;
      for(int i=0;i<15;i++){
        Serial.print(data[i]);
      }
      Serial.println();
      delay(500);
      for(int i=0;i<15;i++){
        data[i]=0;
        pre_record = 0;
      }
  }
  if(count>230){
    count = 0;
  }
    /*for(int i=0;i<15;i++){
    data[i]=0;
    pre_record = 0;
  }*/
  }
  /*
  Serial.print("count : ");
  Serial.print(count);
  Serial.print(" || ");
  Serial.print("count_two : ");
  Serial.print(count_two);
  Serial.print(" || ");
  Serial.print("state : ");
  Serial.print(state);
  Serial.print(" || ");
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
  Serial.print(count_temp);
  Serial.print(" || ");
  Serial.print("data : ");
  for(int i=0;i<15;i++){
    Serial.print(data[i]);
  }
  Serial.println();*/
  //delay(15);
}
