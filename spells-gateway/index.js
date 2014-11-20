var socket = require('socket.io-client')('http://172.16.100.170');

var protocol = require('../spells-messaging/protocol/spells.js')();
var compilers = require('../spells-messaging')().compilers();
protocol = compilers.compileProtocol(protocol);

var buildGatewayStack = function (callback) {
  var transport = require('./lib/transport')();
  var master = require('./lib/master')(protocol);
  var detector = new transport.Detector();
  detector.on(function (data) {
    master.decodeAsyncSafely(data);
  });
  master.on(callback);
  return {
    push: detector.push,
    master: master
  };
};

var sendInitialPacket = function (deviceHash, gatewayHash, userId) {
  console.log('sendInitialPacket', deviceHash, gatewayHash, userId);
  var payload = {
    idx: userId.toString(),
    hash: gatewayHash.toString(),
    status: 1,
    value: 1,
    subList: [
      {
        hash: deviceHash.toString(),
        status: 1,
        value: 1,
        type: 1
      }
    ]
  };
  socket.emit('deviceStatus', payload);
};

var sendStatusPacket = function (deviceHash, gatewayHash, userId, status) {
  console.log('sendStatusPacket', deviceHash, gatewayHash, userId, status);

  var data = {
    subHash: deviceHash,
    title: status ? '문 열림' : '문 닫힘',
    message: '문이 닫힘 상태에서 열림 상태로 변경되었습니다.',
    flag: 3,
    isPush: true
  };
  socket.emit('alertMessage', data);
};

var BluetoothSerialPort = require('bluetooth-serial-port').BluetoothSerialPort;
var bt = new BluetoothSerialPort();

var connected = false;

bt.on('found', function (address, name) {
  console.log('found', address, name);
  if (name !== 'CloudRoom') {
    return;
  }
  connected = true;

  var gatewayHash = 'spellsGatewayHash';

  bt.connect(address, 1, function () {
    console.log('connect', address);

    var dhCounter = 0;
    var dhLast = 0;
    var deviceHash = '';
    var userId = '';

    var gatewayStack = buildGatewayStack(function (input) {
      console.log('input', input);
      if (input.feature.name === 'deviceId') {
        dhLast++;
        console.log('onDeviceId', input.payload.a, input.payload.b, input.payload.c, input.payload.d);
        if (deviceHash === '') {
          deviceHash = input.payload.a.toString(16) + input.payload.b.toString(16) + input.payload.c.toString(16) + input.payload.d.toString(16);
          console.log('deviceHash', deviceHash);
          var data = master.encode({}, protocol.features.userId.methods.requestUserId);
          bt.write(data, function (err, result) {
            console.log('sendUserId', err, result);
          });
        }
      } else if (input.feature.name === 'userId') {
        console.log('onUserId', input.payload.userId);
        userId = 6;
      } else {
        console.log('on:' + input.feature.name);
        if (input.feature.name === 'door') {
          var status = input.payload.status;
          sendStatusPacket(deviceHash, gatewayHash, userId, status);
        }
      }
      if (deviceHash !== '' && userId !== '') {
        sendInitialPacket(deviceHash, gatewayHash, userId);
      }
    });
    var master = gatewayStack.master;
    var push = gatewayStack.push;

    bt.on('data', function (data) {
      push(data);
    });

    setInterval(function () {
      var deviceId = require('./lib/deviceId')();
      var did = deviceId.bufferToDwords(deviceId.generate());
      var payload = {
        a: did[0],
        b: did[1],
        c: did[2],
        d: did[3]
      };
      var data = master.encode(payload, protocol.features.deviceId.methods.deviceId);
      dhCounter = dhCounter + 1;
      if (dhLast + 30 < dhCounter) {
        console.log('timeout');
        process.kill(process.pid, 'SIGKILL');
      }
      bt.write(data, function (err, result) {
        console.log('sendDeviceId', err, result);
      });
    }, 1000);
  });
});

bt.on('finished', function () {
  console.log('finished');
  if (!connected) {
    process.kill(process.pid, 'SIGKILL');
  }
});

socket.on('connect', function () {
  console.log('socket ok.');
});

bt.inquire();