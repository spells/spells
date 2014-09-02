var express = require('express');
var router = express.Router();
var arduino = require('duino');
var board = new arduino.Board({
  debug: true
});
var led = new arduino.Led({
  board: board
});

// 처음 LED 상태를 꺼짐 상태로 설정합니다.
led.off();

var ledStatus = false;

// 현재 LED의 꺼짐 또는 켜짐 상태를 웹 페이지에 표시합니다.
router.get('/', function(req, res) {
  res.render('index', { ledStatus: ledStatus ? 'ON' : 'OFF' });
});

router.get('/toggle', function (req, res) {
  // LED 켜짐 상태에 따라 적절한 동작을 수행하고
  if (ledStatus) {
    led.off();
  } else {
    led.on();
  }
  // LED 켜짐 상태를 반전시킵니다.
  ledStatus = !ledStatus;
  // 첫 페이지로 리디렉트합니다.
  res.redirect('/');
});

module.exports = router;
