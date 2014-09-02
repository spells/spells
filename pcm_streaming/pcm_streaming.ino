
#include <avr/interrupt.h>
#include <avr/io.h>

#define SAMPLE_RATE        8000
// 버퍼 크기는 항상 2의 승수로 합니다.
#define BUFFER_SIZE        1024
// 버퍼 크기의 절반입니다.
#define BUFFER_SIZE_HALF   (BUFFER_SIZE >> 1)
// 8000Hz
#define TCNT_BASE          (0xFFFF - 2000 + 50)

volatile unsigned char soundBuffer[BUFFER_SIZE];

void setup()
{
  // 사운드 버퍼 초기 상태를 중립으로 지정합니다.
  for (int i = 0; i < BUFFER_SIZE; i++)
  {
    soundBuffer[i] = 128;
  }
  
  // LED
  pinMode(13, OUTPUT);

  // SP
  pinMode(9, OUTPUT);
  
  TCCR1B = TCCR1B & 0b11111000 | 0x01;
  
  // 샘플링 레이트 8000Hz입니다.
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

// 샘플링 레이트에 맞추어 타이머 인터럽트가 발생됩니다.
ISR(TIMER3_OVF_vect)
{
  TCNT3 = TCNT_BASE;
  
  // 사운드 버퍼의 적절한 위치에 있는 값으로 PWM 타이머를 설정합니다.
  analogWrite(9, soundBuffer[currentSample]);
  
  // 사운드 버퍼의 절반을 모두 사용했다면 다음 절반을 요청하기 위한 작업을 수행합니다.
  if (currentSample == nextLackPosition)
  {
    // 다음 요청 위치를 계산합니다.
    nextLackPosition += BUFFER_SIZE_HALF;
    nextLackPosition &= BUFFER_SIZE - 1;
    
    lack = 1;
  }
  
  // 샘플 카운트를 증가합니다.
  currentSample++;
  // 샘플 카운트를 버퍼 크기 안으로 유지합니다.
  currentSample &= BUFFER_SIZE - 1;
}

// 온 보드 LED 켜짐 상태 토글
volatile char ledStatus;
void toggle()
{
  ledStatus = !ledStatus;
  digitalWrite(13, ledStatus);
}

volatile unsigned char *sample, *sampleEnd;

// 메인 루프입니다.
void loop()
{
  // 사운드 버퍼 요청이 있다면
  if (lack)
  { 
    // 이번에 쓸 사운드 버퍼의 시작 포인터와 끝 포인터(유효하지 않은 첫 번째 포인터)입니다.
    sample = &soundBuffer[nextLackPosition];
    sampleEnd = &soundBuffer[nextLackPosition + BUFFER_SIZE_HALF];
    
    // 호스트 시스템에 요청 패킷을 보냅니다.
    Serial.write(42);
    for (; sample != sampleEnd; sample++)
    {
      // 호스트 시스템에서 들어오는 패킷을 버퍼에 씁니다.
      while (Serial.available() < 1);
      *sample = Serial.read();
    }
    
    // 사운드 버퍼 요청을 초기화합니다.
    lack = 0;
  }
}

