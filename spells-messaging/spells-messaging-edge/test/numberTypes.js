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
    it('min > max일 때는 예외를 반환해야 합니다.', function () {
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
    it('범위가 너무 넓으면 예외를 반환해야 합니다.', function () {
      numberTypes.decisionType({ type: 'integer', min: -2147483648, max: 2147483647});
      for (var i = -testSize; i <= testSize; i++) {
        assert.throws(function () {
          numberTypes.decisionType({ type: 'integer', min: -2147483648 + i, max: 2147483648 + i});
        });
      }
    });
  });
});