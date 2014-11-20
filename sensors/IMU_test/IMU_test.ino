#include <SPI.h>                                                                                 
#include <NavIMU.h>                    

const float R2D = 57.296;
const int SPI_CS_MPU6000 =  7;
int open_flag = 0; 
float dt;
float p, q, r;
float phi, theta, psi;
float ax, ay, az;
float phi_accel, theta_accel;
float sum,angle_diff,psi_pre=0;




NavIMU imu(SPI_CS_MPU6000);

void setup()
{
  Serial.begin(115200);
  SPI.begin();
  SPI.setClockDivider(SPI_CLOCK_DIV16);           // 1 MHz rate
  pinMode(SPI_CS_MPU6000, OUTPUT);
  digitalWrite(SPI_CS_MPU6000, HIGH);  delay(1);
  imu.init();
}


//-----------------------------------------------------------------------------
//
void loop()
{
  static unsigned long loopEpoch;
  static unsigned int  loopCount;
  if (millis() - loopEpoch < 19) {
    return;
  }
  imu.update();
  loopEpoch = millis();
  imu.get_gyro(&p, &q, &r);
  dt = imu.get_sample_time();
  imu.get_accel(&ax, &ay, &az);
  EulerAccel(ax, ay, &phi_accel, &theta_accel);
  EulerGyro(p, q, r, dt, &phi, &theta, &psi);
  loopCount++;
  angle_diff = psi*R2D-psi_pre*R2D;
  
  if(psi>10000 | psi < -10000){
    psi = 0;
    psi_pre = 0;
  }
  if(angle_diff>100) {
    psi = 0;
    angle_diff = 0;
  }
  sum += angle_diff;
  
  if(angle_diff>9 | angle_diff<-9){
    Serial.println("LED ON");//LED ON
  }
  else if(angle_diff<4 | angle_diff>-4){
    //Serial.println("LED OFF");//LED OFF
  }
  
  if(sum>60 | sum<-60){ 
    Serial.println("OPEN");
    open_flag = 1;// transmit to rasp
    sum = 0;
  }
  
  psi_pre = psi;
  if (50 <= loopCount) {
    loopCount = 0;
    //Serial.print(phi_accel*R2D, 2);   Serial.print(", "); 
    //Serial.print(theta_accel*R2D, 2); Serial.print(", "); 
    Serial.print(psi*R2D, 2);         Serial.println();
    //Serial.print(phi*R2D, 2);         Serial.print(", "); 
    //Serial.print(theta*R2D, 2);       Serial.println();
    if(angle_diff<4 | angle_diff>-4){
      Serial.println("LED OFF");//LED OFF
    }
  }
  delay(10);
}


