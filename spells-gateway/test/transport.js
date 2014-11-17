var assert = require('assert');
var helper = require('./helper');
var _ = require('lodash');

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
  helper.checkFunctionExists(transport.frame, 'encode', 'frame.encode');
  helper.checkFunctionExists(transport.frame, 'decode', 'frame.decode');
  helper.checkFunctionExists(transport, 'Detector');

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

  describe('frame', function () {
    describe('encode', function () {
      it('빈 버퍼에 대한 결과는 ^?twTO$', function () {
        var buffer = new Buffer([]);
        assert.strictEqual(transport.frame.encode(buffer), '^?twTO$');
      });
      it('버퍼 0x6F, 0x6E, 0x65, 0x00에 대한 결과는 ^b25lAA==?k/M0$', function () {
        var buffer = new Buffer([0x6F, 0x6E, 0x65, 0x00]);
        assert.strictEqual(transport.frame.encode(buffer), '^b25lAA==?k/M0$');
      });
    });
    describe('decode', function () {
      it('^?twTO$에 대한 결과는 빈 버퍼', function () {
        var buffer = new Buffer([]);
        assert.deepEqual(transport.frame.decode('^?twTO$'), buffer);
      });
      it('^b25lAA==?k/M0$에 대한 결과는 버퍼 0x6F, 0x6E, 0x65, 0x00', function () {
        var buffer = new Buffer([0x6F, 0x6E, 0x65, 0x00]);
        assert.deepEqual(transport.frame.decode('^b25lAA==?k/M0$'), buffer);
      });
      describe('잘못된 입력 테스트', function () {
        var test = function (text) {
          it('\"' + text + '\" 예외를 던져야 합니다.', function () {
            assert.throws(function () {
              transport.frame.decode(text);
            });
          });
        };
        test('');
        test('^$');
        test('b25lAA==?k/M0');
        test(' b25lAA==?k/M0 ');
      });
    });
  });

  describe('Detector', function () {
    it('버퍼 0x6F, 0x6E, 0x65, 0x00를 2회 읽어야 하는 시나리오', function (done) {
      var log = [];
      var detector = new transport.Detector();
      detector.on(function (body) {
        log.push('1');
        log.push(body);
      });
      detector.on(function (body) {
        log.push('2');
        log.push(body);
      });
      var scenario = 'bad-data^b25lAA==?k/M0bad$b25lAA==?k/M0^data^b25lAA==?k/M0^b25lAA==?k/M0$$b25lAA==?k/M0$^b25lAA==?k/M0$^b25lAA==?k/M0$^b25lAA==?k/M3$';
      _.forEach(scenario, function (data) {
        detector.push(data);
      });
      process.nextTick(function () {
        var buffer = new Buffer([0x6F, 0x6E, 0x65, 0x00]);
        assert.strictEqual(log[0], '1');
        assert.deepEqual(log[1], buffer);
        assert.strictEqual(log[2], '2');
        assert.deepEqual(log[3], buffer);
        assert.strictEqual(log[4], '1');
        assert.deepEqual(log[5], buffer);
        assert.strictEqual(log[6], '2');
        assert.deepEqual(log[7], buffer);
        done();
      });
    });
    it('잡음만 존재하는 시나리오', function () {
      var detector = new transport.Detector();
      detector.on(function () {
        throw new Error();
      });
      var scenario = '398r90qefhdavsnjkblvqiu4htt934qhuibefwjladksl20^b25lAA==?k/M1$23903903q49hurdjklsvqehwirulfvjfonsfsijoeauhbdki';
      _.forEach(scenario, function (data) {
        detector.push(data);
      });
    });
  });
});
