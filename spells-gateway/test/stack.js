var assert = require('assert');
var helper = require('./helper');
var numberTypes = require('../../spells-messaging/lib/numberTypes')();
var compilers = require('../../spells-messaging/lib/compilers')();

describe('stack', function () {
  var stack = require('../lib/stack')();

  helper.checkFunctionExists(stack.deviceIdLayer, 'encode', 'deviceIdLayer.encode');
  helper.checkFunctionExists(stack.deviceIdLayer, 'decode', 'deviceIdLayer.decode');
  helper.checkFunctionExists(stack.serviceIdLayer, 'encode', 'serviceIdLayer.encode');
  helper.checkFunctionExists(stack.serviceIdLayer, 'decode', 'serviceIdLayer.decode');
  helper.checkFunctionExists(stack.applicationLayer, 'encode', 'applicationLayer.encode');
  helper.checkFunctionExists(stack.applicationLayer, 'decode', 'applicationLayer.decode');

  describe('deviceIdLayer', function () {
    describe('encode', function () {
      it('deviceId가 0이고 페이로드가 있는 경우', function () {
        var payload = new Buffer([0x12, 0x34, 0x56]);
        var deviceId = '00000000000000000000000000000000';
        var actual = stack.deviceIdLayer.encode(deviceId, payload);
        var expected = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56]);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 0이고 페이로드가 없는 경우', function () {
        var payload = new Buffer([]);
        var deviceId = '00000000000000000000000000000000';
        var actual = stack.deviceIdLayer.encode(deviceId, payload);
        var expected = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 특정한 값이고 페이로드가 있는 경우', function () {
        var payload = new Buffer([0x22, 0x11, 0x42]);
        var deviceId = '1212345698abcdef123412532674aedc';
        var actual = stack.deviceIdLayer.encode(deviceId, payload);
        var expected = new Buffer([0x12, 0x12, 0x34, 0x56, 0x98, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x12, 0x53, 0x26, 0x74, 0xae, 0xdc, 0x22, 0x11, 0x42]);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 특정한 값이고 페이로드가 없는 경우', function () {
        var payload = new Buffer([]);
        var deviceId = '1212345698abcdef123412532674aedc';
        var actual = stack.deviceIdLayer.encode(deviceId, payload);
        var expected = new Buffer([0x12, 0x12, 0x34, 0x56, 0x98, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x12, 0x53, 0x26, 0x74, 0xae, 0xdc]);
        assert.deepEqual(actual, expected);
      });
    });
    describe('decode', function () {
      it('deviceId가 0이고 페이로드가 있는 경우', function () {
        var buffer = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56]);
        var expected = {
          deviceId: '00000000000000000000000000000000',
          payload: new Buffer([0x12, 0x34, 0x56])
        };
        var actual = stack.deviceIdLayer.decode(buffer);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 0이고 페이로드가 없는 경우', function () {
        var buffer = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        var expected = {
          deviceId: '00000000000000000000000000000000',
          payload: new Buffer([])
        };
        var actual = stack.deviceIdLayer.decode(buffer);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 특정한 값이고 페이로드가 있는 경우', function () {
        var buffer = new Buffer([0x12, 0x12, 0x34, 0x56, 0x98, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x12, 0x53, 0x26, 0x74, 0xae, 0xdc, 0x22, 0x11, 0x42]);
        var expected = {
          deviceId: '1212345698abcdef123412532674aedc',
          payload: new Buffer([0x22, 0x11, 0x42])
        };
        var actual = stack.deviceIdLayer.decode(buffer);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 특정한 값이고 페이로드가 없는 경우', function () {
        var buffer = new Buffer([0x12, 0x12, 0x34, 0x56, 0x98, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x12, 0x53, 0x26, 0x74, 0xae, 0xdc]);
        var expected = {
          deviceId: '1212345698abcdef123412532674aedc',
          payload: new Buffer([])
        };
        var actual = stack.deviceIdLayer.decode(buffer);
        assert.deepEqual(actual, expected);
      });
      it('빈 버퍼이면 예외를 던져야 합니다.', function () {
        assert.throws(function () {
          var buffer = new Buffer([]);
          stack.deviceIdLayer.decode(buffer);
        });
      });
      it('길이가 부족하면 예외를 던져야 합니다.', function () {
        assert.throws(function () {
          var buffer = new Buffer([0x12]);
          stack.deviceIdLayer.decode(buffer);
        });
      });
    });
  });
  describe('serviceIdLayer', function () {
    var testServiceIdLayer = function (serviceIdMin, serviceIdMax, payload) {
      describe(serviceIdMin + '부터 ' + serviceIdMax + '까지이고, 페이로드 길이가 ' + payload.length + '인 경우에', function () {
        var codec = numberTypes.getGatewayCodec({ type: 'integer', min: serviceIdMin, max: serviceIdMax });
        var run = function (serviceId) {
          var encoded = stack.serviceIdLayer.encode(serviceId, payload, codec);
          var decoded = stack.serviceIdLayer.decode(encoded, codec);
          assert.strictEqual(typeof decoded, 'object');
          assert.strictEqual(decoded.serviceId, serviceId);
          assert.deepEqual(decoded.payload, payload);
        };
        it('정상 범위 테스트를 통과해야 합니다.', function () {
          for (var serviceId = serviceIdMin; serviceId <= serviceIdMax; serviceId++) {
            run(serviceId);
          }
        });
        it('범위보다 1 작은 경우 예외를 던져야 합니다.', function () {
          assert.throws(function () {
            run(serviceIdMin - 1);
          });
        });
        it('범위보다 1 큰 경우 예외를 던져야 합니다.', function () {
          assert.throws(function () {
            run(serviceIdMax + 1);
          });
        });
        describe('serviceId 크기보다 짧은 버퍼가 주어진 경우 예외를 던져야 합니다.', function () {
          var testSize = 0;
          var run = function (testSize) {
            it('버퍼 길이 ' + testSize + '에서 예외를 던져야 합니다.', function () {
              var buffer = new Buffer(new Array(testSize));
              assert.strictEqual(buffer.length, testSize);
              assert.throws(function () {
                stack.serviceIdLayer.decode(buffer, codec);
              });
            });
          };
          do {
            run(testSize);
          } while (++testSize < codec.size);
        });
      });
    };
    testServiceIdLayer(0, 0, new Buffer([]));
    testServiceIdLayer(0, 0, new Buffer([0x12, 0x34, 0x23]));
    testServiceIdLayer(0, 100, new Buffer([]));
    testServiceIdLayer(0, 100, new Buffer([0x12, 0x34, 0x23]));
    testServiceIdLayer(0, 600, new Buffer([]));
    testServiceIdLayer(0, 600, new Buffer([0x12, 0x34, 0x23]));
    testServiceIdLayer(0, 70000, new Buffer([]));
    testServiceIdLayer(0, 70000, new Buffer([0x12, 0x34, 0x23]));
  });

  var method0 = {
    name: 'm0',
    fields: []
  };
  var method3 = {
    name: 'm3',
    fields: [
      { name: 'a1Bc', type: 'integer', min: -100, max: 100 },
      { name: 'e2Fg', type: 'integer', min: -1000, max: 1000 },
      { name: 'i3Jk', type: 'integer', min: -50000, max : 50000 }
    ]
  };
  var feature = {
    name: 'f03',
    methods: [
      method0,
      method3
    ]
  };
  var protocol = {
    name: 'pf03',
    features: [feature]
  };
  protocol = compilers.compileProtocol(protocol);
  method0 = protocol.features[0].methods[0];
  method3 = protocol.features[0].methods[1];

  describe('applicationLayer', function () {
    describe('encode', function () {
      describe('method0', function () {
        it('정상 상황을 통과해야 합니다.', function () {
          var payload = {};
          var actual = stack.applicationLayer.encode(payload, method0, protocol);
          var expected = new Buffer([0x00]);
          assert.deepEqual(actual, expected);
        });
      });
      describe('method3', function () {
        it('정상 상황을 통과해야 합니다.', function () {
          var payload = {
            a1Bc: 0,
            e2Fg: 0,
            i3Jk: 0
          };
          var actual = stack.applicationLayer.encode(payload, method3, protocol);
          var expected = new Buffer([0x01, 0x64, 0x03, 0xE8, 0x00, 0x00, 0xC3, 0x50]);
          assert.deepEqual(actual, expected);
        });
        it('예외 상황이라면 예외를 던져야 합니다.', function () {
          var payload = {
            a1Bc: 0,
            i3Jk: 0
          };
          assert.throws(function () {
            stack.applicationLayer.encode(payload, method3, protocol);
          });
        });
      });
    });
    describe('decode', function () {
      describe('method0', function () {
        it('정상 상황에서 정상적으로 동작해야 합니다.', function () {
          var buffer = new Buffer([0x00]);
          var actual = stack.applicationLayer.decode(buffer, protocol);
          var expected = {
            serviceId: 0,
            method: protocol.services[0].method,
            feature: protocol.services[0].feature,
            payload: {}
          };
          assert.deepEqual(actual, expected);
        });
        it('빈 버퍼 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
        it('지나치게 긴 버퍼 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([0x00, 0x00]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
      });
      describe('method3', function () {
        it('정상 상황에서 정상적으로 동작해야 합니다.', function () {
          var buffer = new Buffer([0x01, 0x64, 0x03, 0xE8, 0x00, 0x00, 0xC3, 0x50]);
          var actual = stack.applicationLayer.decode(buffer, protocol);
          var expected = {
            serviceId: 1,
            method: protocol.services[1].method,
            feature: protocol.services[1].feature,
            payload: {
              a1Bc: 0,
              e2Fg: 0,
              i3Jk: 0
            }
          };
          assert.deepEqual(actual, expected);
        });
        it('빈 버퍼 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
        it('지나치게 짧은 버퍼 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([0x01]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
        it('약간 짧은 버퍼 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([0x01, 0x64, 0x03, 0xE8, 0x00, 0x00, 0xC3]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
        it('지나치게 긴 버퍼 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([0x01, 0x64, 0x03, 0xE8, 0x00, 0x00, 0xC3, 0x50, 0x00]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
        it('값이 잘못된 상황이면 예외를 던져야 합니다.', function () {
          var buffer = new Buffer([0x01, 0x64, 0x03, 0xE8, 0x01, 0x00, 0xC3, 0x50]);
          assert.throws(function () {
            stack.applicationLayer.decode(buffer, protocol);
          });
        });
      });
      it('잘못된 서비스 번호가 들어가면 예외를 던져야 합니다.', function () {
        var buffer = new Buffer([0x02]);
        assert.throws(function () {
          stack.applicationLayer.decode(buffer, protocol);
        });
      });
    });
  });
});
