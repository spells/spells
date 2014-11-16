var assert = require('assert');
var helper = require('./helper');

describe('stack', function () {
  var stack = require('../lib/stack')();

  helper.checkFunctionExists(stack.deviceIdLayer, 'encode', 'deviceIdLayer.encode');
  helper.checkFunctionExists(stack.deviceIdLayer, 'decode', 'deviceIdLayer.decode');
  helper.checkFunctionExists(stack.featureLayer, 'encode', 'featureLayer.encode');
  helper.checkFunctionExists(stack.featureLayer, 'decode', 'featureLayer.decode');
  helper.checkFunctionExists(stack.methodLayer, 'encode', 'methodLayer.encode');
  helper.checkFunctionExists(stack.methodLayer, 'decode', 'methodLayer.decode');

  describe('deviceIdLayer', function () {
    describe('encode', function () {
      it('deviceId가 0이고 페이로드가 있는 경우', function () {
        var featureLayerEncoded = new Buffer([0x12, 0x34, 0x56]);
        var deviceId = '00000000000000000000000000000000';
        var actual = stack.deviceIdLayer.encode(featureLayerEncoded, deviceId);
        var expected = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56]);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 0이고 페이로드가 없는 경우', function () {
        var featureLayerEncoded = new Buffer([]);
        var deviceId = '00000000000000000000000000000000';
        var actual = stack.deviceIdLayer.encode(featureLayerEncoded, deviceId);
        var expected = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 특정한 값이고 페이로드가 있는 경우', function () {
        var featureLayerEncoded = new Buffer([0x22, 0x11, 0x42]);
        var deviceId = '1212345698abcdef123412532674aedc';
        var actual = stack.deviceIdLayer.encode(featureLayerEncoded, deviceId);
        var expected = new Buffer([0x12, 0x12, 0x34, 0x56, 0x98, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x12, 0x53, 0x26, 0x74, 0xae, 0xdc, 0x22, 0x11, 0x42]);
        assert.deepEqual(actual, expected);
      });
      it('deviceId가 특정한 값이고 페이로드가 없는 경우', function () {
        var featureLayerEncoded = new Buffer([]);
        var deviceId = '1212345698abcdef123412532674aedc';
        var actual = stack.deviceIdLayer.encode(featureLayerEncoded, deviceId);
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
  describe('featureLayer', function () {
    describe('encode', function () {
    });
    describe('decode', function () {
    });
  });
  describe('methodLayer', function () {
    describe('encode', function () {
    });
    describe('decode', function () {
    });
  });
});
