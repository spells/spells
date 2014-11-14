var assert = require('assert');
var helper = require('./helper');

describe('methodGenerator', function () {
  var methodGenerator = require('../lib/methodGenerator')();

  helper.checkFunctionExists(methodGenerator, 'getList');
  helper.checkFunctionExists(methodGenerator, 'getSendBody');
  helper.checkFunctionExists(methodGenerator, 'getReceiveBody');
  helper.checkFunctionExists(methodGenerator, 'getSendPrototypeWithoutSemicolon');
  helper.checkFunctionExists(methodGenerator, 'getReceivePrototypeWithoutSemicolon');
  helper.checkFunctionExists(methodGenerator, 'getOnPrototype');
  helper.checkFunctionExists(methodGenerator, 'getListWithoutType');
  
  var method0 = {
    name: 'temperatureZero',
    fields: []
  };

  var method3 = {
    name: 'temperatureThree',
    fields: [
      { name: 'one',  type: 'integer',  min: -100, max: 100 },
      { name: 'two',  type: 'integer',  min: -200, max: 200 },
      { name: 'three',  type: 'integer',  min: -50000, max: 50000 }
    ]
  };

  var ioGeneratorMock = require('./ioGeneratorMock');

  describe('method0', function () {
    var ioGenerator = ioGeneratorMock();
    it('getList', function () {
      var list = methodGenerator.getList(method0);
      assert.strictEqual(list, '(void)');
    });
    it('getListWithoutType', function () {
      var list = methodGenerator.getListWithoutType(method0);
      assert.strictEqual(list, '()');
    });
    it('getSendBody', function () {
      var sendBody = methodGenerator.getSendBody(method0, ioGenerator);
      assert.strictEqual(sendBody, '');
    });
    it('getReceiveBody', function () {
      var receiveBody = methodGenerator.getReceiveBody(method0, ioGenerator);
      assert.strictEqual(receiveBody, 'onTemperatureZero();\n');
    });
    it('getSendPrototypeWithoutSemicolon', function () {
      var actual = methodGenerator.getSendPrototypeWithoutSemicolon(method0);
      assert.strictEqual(actual, 'void sendTemperatureZero(void)');
    });
    it('getReceivePrototypeWithoutSemicolon', function () {
      var actual = methodGenerator.getReceivePrototypeWithoutSemicolon(method0);
      assert.strictEqual(actual, 'void _receiveTemperatureZero(void)');
    });
    it('getOnPrototype', function () {
      var actual = methodGenerator.getOnPrototype(method0);
      assert.strictEqual(actual, 'void onTemperatureZero(void);');
    });
  });

  describe('method3', function () {
    var ioGenerator = ioGeneratorMock();
    it('getList', function () {
      var list = methodGenerator.getList(method3);
      assert.strictEqual(list, '(long one, long two, long three)');
    });
    it('getListWithoutType', function () {
      var list = methodGenerator.getListWithoutType(method3);
      assert.strictEqual(list, '(one, two, three)');
    });
    it('getSendBody', function () {
      var sendBody = methodGenerator.getSendBody(method3, ioGenerator);
      var expected = '';
      expected += 'write:1:unsigned char:-100:one\n';
      expected += 'write:2:unsigned int:-200:two\n';
      expected += 'write:4:unsigned long:-50000:three\n';
      assert.strictEqual(sendBody, expected);
    });
    it('getReceiveBody', function () {
      var receiveBody = methodGenerator.getReceiveBody(method3, ioGenerator);
      var expected = '';
      expected += 'read:1:unsigned char:-100:one\n';
      expected += 'read:2:unsigned int:-200:two\n';
      expected += 'read:4:unsigned long:-50000:three\n';
      expected += 'onTemperatureThree(one, two, three);\n';
      assert.strictEqual(receiveBody, expected);
    });
    it('getSendPrototypeWithoutSemicolon', function () {
      var actual = methodGenerator.getSendPrototypeWithoutSemicolon(method3);
      assert.strictEqual(actual, 'void sendTemperatureThree(long one, long two, long three)');
    });
    it('getReceivePrototypeWithoutSemicolon', function () {
      var actual = methodGenerator.getReceivePrototypeWithoutSemicolon(method3);
      assert.strictEqual(actual, 'void _receiveTemperatureThree(void)');
    });
    it('getOnPrototype', function () {
      var actual = methodGenerator.getOnPrototype(method3);
      assert.strictEqual(actual, 'void onTemperatureThree(long one, long two, long three);');
    });
  });
});
