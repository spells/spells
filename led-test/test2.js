// Arduino 라이브러리 duino를 이용하여 온 보드 LED를 제어합니다.
var arduino = require('duino');

var board = new arduino.Board({
  debug: true
});

var led = new arduino.Led({
  board: board
});

// 500ms로 LED를 점멸하도록 합니다.
led.blink(500);
