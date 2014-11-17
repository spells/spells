var assert = require('assert');
var deviceId = require('../lib/deviceId')();

describe('deviceId', function () {
  describe('generate', function () {
    it('결과가 항상 달라야 합니다.', function () {
       var a = deviceId.generate();
       var b = deviceId.generate();
       var c = deviceId.generate();
       assert.notDeepEqual(a, b);
       assert.notDeepEqual(a, c);
       assert.notDeepEqual(b, c);
    });
  });
  var buffer = new Buffer([0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef]);
  var dwords = [0x12345678, 0x90abcdef, 0x12345678, 0x90abcdef];
  var string = '1234567890abcdef1234567890abcdef';

  describe('bufferToDwords', function () {
    it('12 34 56 78 90 ab cd ef 12 34 56 78 90 ab cd ef', function () {
      assert.deepEqual(deviceId.bufferToDwords(buffer), dwords);
    });
  });
  describe('bufferToString', function () {
    it('12 34 56 78 90 ab cd ef 12 34 56 78 90 ab cd ef', function () {
      assert.strictEqual(deviceId.bufferToString(buffer), string);
    });
  });
  describe('dwordsToBuffer', function () {
    it('12 34 56 78 90 ab cd ef 12 34 56 78 90 ab cd ef', function () {
      assert.deepEqual(deviceId.dwordsToBuffer(dwords), buffer);
    });
  });
  describe('dwordsToString', function () {
    it('12 34 56 78 90 ab cd ef 12 34 56 78 90 ab cd ef', function () {
      assert.strictEqual(deviceId.dwordsToString(dwords), string);
    });
  });
  describe('stringToDwords', function () {
    it('12 34 56 78 90 ab cd ef 12 34 56 78 90 ab cd ef', function () {
      assert.deepEqual(deviceId.stringToDwords(string), dwords);
    });
  });
  describe('stringToBuffer', function () {
    it('12 34 56 78 90 ab cd ef 12 34 56 78 90 ab cd ef', function () {
      assert.deepEqual(deviceId.stringToBuffer(string), buffer);
    });
  });
});