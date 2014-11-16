var assert = require('assert');
var helper = require('./helper');

describe('numberTypes', function () {
  var numberTypes = require('../lib/numberTypes')();
  describe('decisionType', function () {
    helper.checkFunctionExists(numberTypes, 'decisionType');
    it('type이 null이거나 undefined이면 예외를 던져야 합니다.', function () {
      assert.throws(function () {
        numberTypes.decisionType(null);
      });
      assert.throws(function () {
        numberTypes.decisionType(undefined);
      });
      assert.throws(function () {
        numberTypes.decisionType('');
      });
      assert.throws(function () {
        numberTypes.decisionType({});
      });
    });
    it('min 또는 max가 null이면 예외를 던져야 합니다.', function () {
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: null, max: 0});
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: 0, max: null});
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: null, max: null});
      });
    });
    it('integer만 지원해야 합니다.', function () {
      numberTypes.decisionType({ type: 'integer', min: 0, max: 0 });
      assert.throws(function () {
        numberTypes.decisionType({ type: '', min: 0, max: 0 });
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'double', min: 0, max: 0 });
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'string', min: 0, max: 0 });
      });
    });
    it('min이 undefined이거나, min과 max가 모두 undefined이면 예외를 던져야 합니다.', function () {
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: undefined, max: 0});
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: undefined, max: undefined});
      });
    });
    var testInteger = function (min, max, type) {
      assert.strictEqual(
        numberTypes.decisionType({ type: 'integer', min: min, max: max}),
        type
      );
    };
    it('max가 undefined이면 unsigned long을 반환해야 합니다.', function () {
      testInteger(0, undefined, 'unsigned long');
      testInteger(-1000, undefined, 'unsigned long');
      testInteger(1000, undefined, 'unsigned long');
    });
    it('min > max일 때는 예외를 던져야 합니다.', function () {
      numberTypes.decisionType({ type: 'integer', min: -1, max: 0});
      numberTypes.decisionType({ type: 'integer', min: -2, max: -1});
      numberTypes.decisionType({ type: 'integer', min: 0, max: 1});
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: 0, max: -1});
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: -1, max: -2});
      });
      assert.throws(function () {
        numberTypes.decisionType({ type: 'integer', min: 1, max: 0});
      });
    });
    
    var testSize = 256;

    it('unsigned char', function () {
      for (var i = -testSize; i <= testSize; i++) {
        testInteger(0 + i, 0 + i, 'unsigned char');
        testInteger(0 + i, 255 + i, 'unsigned char');
      }
    });
    it('unsigned int', function () {
      testInteger(-32768, 32767, 'unsigned int');
      for (var i = -testSize; i <= testSize; i++) {
        testInteger(0 + i, 256 + i, 'unsigned int');
        testInteger(0 + i, 65535 + i, 'unsigned int');
      }
    });
    it('unsigned long', function () {
      testInteger(-2147483648, 2147483647, 'unsigned long');
      for (var i = -testSize; i <= testSize; i++) {
        testInteger(0 + i, 4000000000 + i, 'unsigned long');
      }
    });
    it('범위가 너무 넓으면 예외를 던져야 합니다.', function () {
      numberTypes.decisionType({ type: 'integer', min: -2147483648, max: 2147483647});
      var test = function (i) {
        assert.throws(function () {
          numberTypes.decisionType({ type: 'integer', min: -2147483648 + i, max: 2147483648 + i});
        });
      };
      for (var i = -testSize; i <= testSize; i++) {
        test(i);
      }
    });
  });
  describe('getEdgeCodec, getGatewayCodec', function () {
    var testCase1 = { type: 'integer', min: -2, max: -1 };
    var testCase8 = { type: 'integer', min: -64, max: 128 };
    var testCase16 = { type: 'integer', min: -1000, max: 8000 };
    var testCase32 = { type: 'integer', min: -50000, max: 160000 };

    helper.checkFunctionExists(numberTypes, 'getEdgeCodec');
    helper.checkFunctionExists(numberTypes, 'getGatewayCodec');

    it('codec를 반환해야 합니다.', function () {
      assert.strictEqual(typeof numberTypes.getGatewayCodec(testCase1), 'object');
      assert.strictEqual(typeof numberTypes.getGatewayCodec(testCase8), 'object');
      assert.strictEqual(typeof numberTypes.getGatewayCodec(testCase16), 'object');
      assert.strictEqual(typeof numberTypes.getGatewayCodec(testCase32), 'object');
      assert.strictEqual(typeof numberTypes.getEdgeCodec(testCase1), 'object');
      assert.strictEqual(typeof numberTypes.getEdgeCodec(testCase8), 'object');
      assert.strictEqual(typeof numberTypes.getEdgeCodec(testCase16), 'object');
      assert.strictEqual(typeof numberTypes.getEdgeCodec(testCase32), 'object');
    });
    var testCodec = function (option) {
      describe('edgeCodec', function () {
        var ioGenerator = require('./ioGeneratorMock')();
        var edgeCodec = numberTypes.getEdgeCodec(option);
        it('codec이 반환되어야 합니다.', function () {
          assert.strictEqual(typeof edgeCodec, 'object');
          assert.strictEqual(typeof edgeCodec.read, 'function');
          assert.strictEqual(typeof edgeCodec.write, 'function');
        });
        describe('Mock을 사용하는 테스트', function () {
          var type = numberTypes.decisionType(option);
          var size = numberTypes.typeToBytes(type);
          it('read', function () {
            assert.strictEqual(
              edgeCodec.read('myTarget', ioGenerator),
              'read:' + size + ':' + type + ':' + option.min + ':myTarget'
            );
          });
          it('write', function () {
            assert.strictEqual(
              edgeCodec.write('myTarget', ioGenerator),
              'write:' + size + ':' + type + ':' + option.min + ':myTarget'
            );
          });
        });
      });
      describe('gatewayCodec', function () {
        var gatewayCodec = numberTypes.getGatewayCodec(option);
        it('codec이 반환되어야 합니다.', function () {
          assert.strictEqual(typeof gatewayCodec, 'object');
          assert.strictEqual(typeof gatewayCodec.encode, 'function');
          assert.strictEqual(typeof gatewayCodec.decode, 'function');
        });
        it('범위 안 테스트', function () {
          for (var i = option.min; i <= option.max; i++) {
            assert.strictEqual(gatewayCodec.encode(i), i - option.min);
            assert.strictEqual(gatewayCodec.decode(gatewayCodec.encode(i)), i);
            assert.strictEqual(gatewayCodec.decode(i - option.min), i);
          }
        });
        it('범위 밖 테스트', function () {
          assert.throws(function () {
            gatewayCodec.decode(-1);
          });
          gatewayCodec.decode(option.max - option.min);
          assert.throws(function () {
            gatewayCodec.decode(option.max - option.min + 1);
          });
          assert.throws(function () {
            gatewayCodec.encode(option.min - 1);
          });
          assert.throws(function () {
            gatewayCodec.encode(option.max + 1);
          });
        });
      });
    };
    it('잘못된 내용이 주어지면 예외를 던져야 합니다.', function () {
      assert.throws(function () {
        numberTypes.getCodec({});
      });
    });
    describe('testCase1', function () {
      testCodec(testCase1);
    });
    describe('testCase8', function () {
      testCodec(testCase8);
    });
    describe('testCase16', function () {
      testCodec(testCase16);
    });
    describe('testCase32', function () {
      testCodec(testCase32);
    });
  });
  describe('typeToBytes', function () {
    helper.checkFunctionExists(numberTypes, 'typeToBytes');
    it('잘못된 자료형이 주어지면 예외를 던져야 합니다.', function () {
      assert.throws(function () {
        numberTypes.typeToBytes(null);
      });
      assert.throws(function () {
        numberTypes.typeToBytes(undefined);
      });
      assert.throws(function () {
        numberTypes.typeToBytes('int');
      });
    });
    it('unsigned char, unsigned int, unsigned long을 지원해야 합니다.', function () {
      assert.strictEqual(numberTypes.typeToBytes('unsigned char'), 1);
      assert.strictEqual(numberTypes.typeToBytes('unsigned int'), 2);
      assert.strictEqual(numberTypes.typeToBytes('unsigned long'), 4);
    });
  });
});