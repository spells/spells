var assert = require('assert');
var helper = require('./helper');

describe('featureGenerator', function () {

  var feature = {
    name: 'theFeature',
    methods: [
      {
        name: 'm0',
        fields: []
      },
      {
        name: 'm3',
        fields: [
          { name: 'a', min: -100, max: 100 },
          { name: 'b', min: -1000, max: 1000 },
          { name: 'c', min: -50000, max : 50000 }
        ]
      }
    ]
  };

  var featureGenerator = require('../lib/featureGenerator')();
  helper.checkFunctionExists(featureGenerator, 'writeReceiveFeature');
  helper.checkFunctionExists(featureGenerator, 'writeReceiveFeatureBody');
  helper.checkFunctionExists(featureGenerator, 'getReceiveFeaturePrototypeWithoutSemicolon');


  describe('writeReceiveFeature', function () {
    it('예상되는 결과를 얻어야 합니다.', function () {
      var writeReceiveFeatureBodyMock = function (feature, writer) {
        writer.write('body');
      };
      var writer = require('../lib/codeWriter')();
      var ioGenerator = require('./ioGeneratorMock');
      featureGenerator.writeReceiveFeature(feature, writer, ioGenerator, writeReceiveFeatureBodyMock);
      var expected = '';
      expected += 'void _receive(void)\n';
      expected += '{\n';
      expected += '\tbody\n';
      expected += '}';
      assert.strictEqual(writer.render(), expected);
    });
  });

  describe('writeReceiveFeatureBody', function () {
    it('예상되는 결과를 얻어야 합니다.', function () {
      var ioGenerator = require('./ioGeneratorMock')();
      var writer = require('../lib/codeWriter')();
      featureGenerator.writeReceiveFeatureBody(feature, writer, ioGenerator);
      var expected = '';
      expected += 'long methodId;\n';
      expected += 'read:1:unsigned char:0:methodId\n';
      expected += 'switch (methodId)\n';
      expected += '{\n';
      expected += 'case 0:\n';
      expected += '\t_receiveM0();\n';
      expected += '\tbreak;\n';
      expected += 'case 1:\n';
      expected += '\t_receiveM3();\n';
      expected += '\tbreak;\n';
      expected += 'default:;\n';
      expected += '}';
      assert.strictEqual(writer.render(), expected);
    });
  });
});