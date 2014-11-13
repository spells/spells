var assert = require('assert');

describe('numberTypes', function () {
  var numberTypes = require('../lib/numberTypes')();
  describe('decisionType', function () {
    it('decisionType 함수가 있어야 합니다.', function () {
      assert.strictEqual(typeof numberTypes.decisionType, 'function');
    });
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
      for (var i = -testSize; i <= testSize; i++) {
        assert.throws(function () {
          numberTypes.decisionType({ type: 'integer', min: -2147483648 + i, max: 2147483648 + i});
        });
      }
    });
  });
  describe('getCodec', function () {
    
    var testCase1 = { type: 'integer', min: -2, max: -1 };
    var testCase8 = { type: 'integer', min: -64, max: 128 };
    var testCase16 = { type: 'integer', min: -1000, max: 8000 };
    var testCase32 = { type: 'integer', min: -50000, max: 160000 };

    it('getCodec 함수가 있어야 합니다.', function () {
      assert.strictEqual(typeof numberTypes.getCodec, 'function');
    });
    it('codec를 반환해야 합니다.', function () {
      assert.strictEqual(typeof numberTypes.getCodec(testCase1), 'object');
      assert.strictEqual(typeof numberTypes.getCodec(testCase8), 'object');
      assert.strictEqual(typeof numberTypes.getCodec(testCase16), 'object');
      assert.strictEqual(typeof numberTypes.getCodec(testCase32), 'object');
    });
    var testCodec = function (option) {
      var codec = numberTypes.getCodec(option);
      it('codec이 반환되어야 합니다.', function () {
        assert.strictEqual(typeof codec, 'object');
        assert.strictEqual(typeof codec.encode, 'function');
        assert.strictEqual(typeof codec.decode, 'function');
      });
      it('범위 안 테스트', function () {
        for (var i = option.min; i <= option.max; i++) {
          assert.strictEqual(codec.encode(i), i - option.min);
          assert.strictEqual(codec.decode(codec.encode(i)), i);
          assert.strictEqual(codec.decode(i - option.min), i);
        }
      });
      it('범위 밖 테스트', function () {
        assert.throws(function () {
          codec.decode(-1);
        });
        codec.decode(option.max - option.min);
        assert.throws(function () {
          codec.decode(option.max - option.min + 1);
        });
        assert.throws(function () {
          codec.encode(option.min - 1);
        });
        assert.throws(function () {
          codec.encode(option.max + 1);
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
  });
});