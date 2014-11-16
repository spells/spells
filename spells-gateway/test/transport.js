var assert = require('assert');
var helper = require('./helper');

describe('transport', function () {

  var transport = require('../lib/transport')();
  
  it('모듈이 있어야 합니다.', function () {
    assert.ok(transport);
  });

  helper.checkFunctionExists(transport.checksum, 'crc24', 'checksum.crc24');
  helper.checkFunctionExists(transport.base64, 'encode', 'base64.encode');
  helper.checkFunctionExists(transport.base64, 'decode', 'base64.decode');
  helper.checkFunctionExists(transport.armor, 'encode', 'armor.encode');
  helper.checkFunctionExists(transport.armor, 'decode', 'armor.decode');

  describe('checksum', function () {
    describe('crc24', function () {
      it('빈 버퍼에 대한 결과는 0xb704ce', function () {
        var buffer = new Buffer([]);
        assert.strictEqual(transport.checksum.crc24(buffer), 0xb704ce);
      });
      it('문자열 \"one\\0\"를 나타내는 버퍼 0x6F, 0x6E, 0x65, 0x00에 대한 결과는 0x93f334', function () {
        var data = [0x6F, 0x6E, 0x65, 0x00];
        var buffer = new Buffer(data);
        assert.strictEqual(transport.checksum.crc24(buffer), 0x93f334);
      });
    });
  });

  describe('base64', function () {
    describe('encode', function () {
      it('빈 버퍼에 대한 결과는 \"\"', function () {
        var buffer = new Buffer([]);
        assert.strictEqual(transport.base64.encode(buffer), '');
      });
      it('문자열 \"one\\0\"를 나타내는 버퍼 0x6F, 0x6E, 0x65, 0x00에 대한 결과는 b25lAA==', function () {
        var data = [0x6F, 0x6E, 0x65, 0x00];
        var buffer = new Buffer(data);
        assert.strictEqual(transport.base64.encode(buffer), 'b25lAA==');
      });
      it('버퍼 0xB7, 0x04, 0xCE에 대한 결과는 twTO', function () {
        var data = [0xB7, 0x04, 0xCE];
        var buffer = new Buffer(data);
        assert.strictEqual(transport.base64.encode(buffer), 'twTO');
      });
      it('버퍼 0x93, 0xF3, 0x34에 대한 결과는 k/M0', function () {
        var data = [0x93, 0xF3, 0x34];
        var buffer = new Buffer(data);
        assert.strictEqual(transport.base64.encode(buffer), 'k/M0');
      });
    });
    describe('decode', function () {
      it('\"\"에 대한 결과는 빈 버퍼', function () {
        var buffer = new Buffer([]);
        assert.deepEqual(transport.base64.decode(''), buffer);
      });
      it('b25lAA==에 대한 결과는 버퍼 0x6F, 0x6E, 0x65, 0x00', function () {
        var data = [0x6F, 0x6E, 0x65, 0x00];
        var buffer = new Buffer(data);
        assert.deepEqual(transport.base64.decode('b25lAA=='), buffer);
      });
      it('twTO에 대한 결과는 버퍼 0xB7, 0x04, 0xCE', function () {
        var data = [0xB7, 0x04, 0xCE];
        var buffer = new Buffer(data);
        assert.deepEqual(transport.base64.decode('twTO'), buffer);
      });
      it('잘못된 입력이 주어지면 예외를 던져야 합니다.', function () {
        assert.throws(function () {
          transport.base64.decode('===');
        });
        assert.throws(function () {
          transport.base64.decode('안녕하세요');
        });
        assert.throws(function () {
          transport.base64.decode('-');
        });
      });
    });
  });

  describe('armor', function () {
    describe('encode', function () {
      it('빈 버퍼에 대한 결과는 ?twTO', function () {
        var buffer = new Buffer([]);
        assert.strictEqual(transport.armor.encode(buffer), '?twTO');
      });
      it('버퍼 0x6F, 0x6E, 0x65, 0x00에 대한 결과는 b25lAA==?k/M0', function () {
        var buffer = new Buffer([0x6F, 0x6E, 0x65, 0x00]);
        assert.strictEqual(transport.armor.encode(buffer), 'b25lAA==?k/M0');
      });
    });
    describe('decode', function () {
      it('?twTO에 대한 결과는 빈 버퍼', function () {
        var buffer = new Buffer([]);
        assert.deepEqual(transport.armor.decode('?twTO'), buffer);
      });
      it('b25lAA==?k/M0에 대한 결과는 버퍼 0x6F, 0x6E, 0x65, 0x00', function () {
        var buffer = new Buffer([0x6F, 0x6E, 0x65, 0x00]);
        assert.deepEqual(transport.armor.decode('b25lAA==?k/M0'), buffer);
      });
      describe('잘못된 입력 테스트', function () {
        var test = function (text) {
          it('\"' + text + '\" 예외를 던져야 합니다.', function () {
            assert.throws(function () {
              transport.armor.decode(text);
            });
          });
        };
        test('');
        test('?');
        test('??');
        test('b25lAA==?k/M0?');
        test('b25lAA==??k/M0');
        test('?b25lAA==?k/M0');
        test('b25lAA==k/M0');
        test('b25lAA==?k/M1');
        test('b25lAB==?k/M0');
        test('예외');
        test('오류');
        test('안녕하세요');
      });
    });
  });
});
