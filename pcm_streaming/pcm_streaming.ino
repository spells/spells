
#include <avr/interrupt.h>
#include <avr/io.h>

#define SAMPLE_RATE        8000
#define BUFFER_SIZE        1024
#define BUFFER_SIZE_HALF   (BUFFER_SIZE >> 1)
#define TCNT_BASE          (0xFFFF - 2000 + 50)

volatile unsigned char soundBuffer[BUFFER_SIZE];

void setup()
{
  for (int i = 0; i < BUFFER_SIZE; i++)
  {
    soundBuffer[i] = 128;
  }
  
  // LED
  pinMode(13, OUTPUT);

  // SP
  pinMode(9, OUTPUT);
  
  TCCR1B = TCCR1B & 0b11111000 | 0x01;
  
  // 8000
  TCCR3A = 0b00000000;
  TCCR3B = 0b00000001;
  TIMSK3 = 0b00000001;
  TCNT3 = TCNT_BASE;
  
  Serial.begin(115200);
  while (!Serial);
}

int currentSample;

volatile int nextLackPosition;
volatile char lack;

ISR(TIMER3_OVF_vect)
{
  TCNT3 = TCNT_BASE;
  
  analogWrite(9, soundBuffer[currentSample]);
  
  if (currentSample == nextLackPosition)
  {
    nextLackPosition += BUFFER_SIZE_HALF;
    nextLackPosition &= BUFFER_SIZE - 1;
    
    lack = 1;
  }
  
  currentSample++;
  currentSample &= BUFFER_SIZE - 1;
}

volatile char ledStatus;
void toggle()
{
  ledStatus = !ledStatus;
  digitalWrite(13, ledStatus);
}

volatile unsigned char *sample, *sampleEnd;

void loop()
{
  if (lack)
  { 
    sample = &soundBuffer[nextLackPosition];
    sampleEnd = &soundBuffer[nextLackPosition + BUFFER_SIZE_HALF];
    
    Serial.write(42);
    for (; sample != sampleEnd; sample++)
    {
      while (Serial.available() < 1);
      *sample = Serial.read();
    }
    
    lack = 0;
  }
}

