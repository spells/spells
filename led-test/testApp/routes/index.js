var express = require('express');
var router = express.Router();
var arduino = require('duino');
var board = new arduino.Board({
  debug: true
});
var led = new arduino.Led({
  board: board
});

led.off();

var ledStatus = false;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { ledStatus: ledStatus ? 'ON' : 'OFF' });
});

router.get('/toggle', function (req, res) {
  if (ledStatus) {
    led.off();
  } else {
    led.on();
  }
  ledStatus = !ledStatus;
  res.redirect('/');
});

module.exports = router;
