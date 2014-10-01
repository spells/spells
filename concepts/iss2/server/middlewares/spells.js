module.exports = function (riccardo) {
  var SerialPort = require('serialport').SerialPort;
  var serialPort = new SerialPort('/dev/tty.usbmodem1421', {
    baudrate: 9600
  });

  var moment = require('moment');

  var redis = require('redis');
  var redisClient = redis.createClient();

  var getLength = function (cb) {
    redisClient.llen('knobData', cb);
  };

  redisClient.del('knobData');

  var getRecent = function (cb) {
    redisClient.lrange('knobData', 0, 20, cb);
  };

  var getMode = function (cb) {
    var modeDescription = mode == 'speed' ? '주기 조절' : '켜짐 조절';
    cb(null, modeDescription);
  };

  var toggleMode = function () {
    if (mode == 'speed') {
      mode = 'onoff';
    } else {
      mode = 'speed';
    }
  };

  var mode = 'speed';

  var readBuffer = [];

  var writeData = function (device, method, payload, cb) {
    device = (device & 0x7F) | (method << 7);
    var buffer = [device];
    if (payload != null) {
      buffer.push((payload >> 8) & 0x0F);
      buffer.push(payload & 0x0F);
    } else {
      cb = payload;
    }
    serialPort.write(buffer, cb);
  };

  var last = moment();
  var speedLedStatus = 1;

  var readData = function () {
    if (readBuffer.length >= 3) {
      var header = readBuffer[0];
      readBuffer.shift();
      var device = header & 0x7F;
      var method = header >> 7;
      var payload = (readBuffer[0] << 8) + readBuffer[1];
      readBuffer.shift();
      readBuffer.shift();

      var obj = { timestamp: new Date(), value: payload };
      redisClient.lpush('knobData', JSON.stringify(obj));

      if (mode == 'speed') {
        var timespan = moment() - last;
        writeData(2, 1, speedLedStatus, function (err, result) {
          writeData(1, 0);
        });
        payload = payload + 150;
        if (timespan >= payload) {
          last = moment();
          speedLedStatus = 1 - speedLedStatus;
        }
      } else {
        var ledStatus = payload >= 411;
        writeData(2, 1, ledStatus, function (err, result) {
          writeData(1, 0);
        });
      }

      
      readData();
    }
  };

  var addToBuffer = function (data) {
    for (var i = 0; i < data.length; i++) {
      readBuffer.push(data[i]);
    }
  };

  serialPort.on('open', function () {
    serialPort.on('data', function (data) {
      addToBuffer(data);
      readData();
    });
    writeData(1, 0);
  });

  riccardo.set('spellsMiddleware', {
    getLength: getLength,
    getRecent: getRecent,
    getMode: getMode,
    toggleMode: toggleMode
  });
};