var assert = require('assert');
var helper = require('./helper');

describe('transport', function () {

  var transport = require('../lib/transport')();
  
  it('모듈이 있어야 합니다.', function () {
    assert.ok(transport);
  });

  helper.checkFunctionExists(transport.checksum, 'crc24');
  helper.checkFunctionExists(transport, 'parseText');

  describe('checksum', function () {
    describe('crc24', function () {
      it('빈 버퍼에 대한 CRC24 값은 0xb704ce', function () {
        var buffer = new Buffer([]);
        assert.strictEqual(transport.checksum.crc24(buffer), 0xb704ce);
      });
      it('문자열 \"one\\0\"를 나타내는 버퍼 0x6F, 0x6E, 0x65, 0x00의 CRC24 값은 0x93f334', function () {
        var data = [0x6F, 0x6E, 0x65, 0x00];
        var buffer = new Buffer(data);
        assert.strictEqual(transport.checksum.crc24(buffer), 0x93f334);
      });
    });
  });
});
