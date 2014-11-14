var assert = require('assert');
var helper = require('./helper');
  var fs = require('fs');

describe('edgeGenerator', function () {

  var feature1 = {
    name: 'f1',
    methods: [
      {
        name: 'm0',
        fields: []
      },
      {
        name: 'm3',
        fields: [
          { name: 'a', type: 'integer', min: -100, max: 100 },
          { name: 'b', type: 'integer', min: -1000, max: 1000 },
          { name: 'c', type: 'integer', min: -50000, max : 50000 }
        ]
      }
    ]
  };
  var feature2 = {
    name: 'f2',
    methods: [
      {
        name: 'k0',
        fields: []
      },
      {
        name: 'k3',
        fields: [
          { name: 'one', type: 'integer', min: -100, max: 100 },
          { name: 'two', type: 'integer', min: -1000, max: 1000 },
          { name: 'three', type: 'integer', min: -50000, max : 50000 }
        ]
      }
    ]
  };
  var protocol = {
    name: 'proto1',
    features: [
      feature1,
      feature2
    ]
  };

  var edgeGenerator = require('../lib/edgeGenerator')();
  helper.checkFunctionExists(edgeGenerator, 'generateHeader');
  helper.checkFunctionExists(edgeGenerator, 'generateSource');

  describe('generateHeader', function () {
    it('예상되는 결과를 얻어야 합니다.', function () {
      var expected = fs.readFileSync(__dirname + '/expectedHeader.h', 'utf-8');
      var ioGenerator = require('./ioGeneratorMock')();
      var writer = require('../lib/codeWriter')();
      edgeGenerator.generateHeader(protocol, writer, ioGenerator);
      var actual = writer.render();
      assert.strictEqual(actual, expected);
    });
  });
  describe('generateSource', function () {
    it('예상되는 결과를 얻어야 합니다.', function () {
      var expected = fs.readFileSync(__dirname + '/expectedSource.cpp', 'utf-8');
      var ioGenerator = require('./ioGeneratorMock')();
      var writer = require('../lib/codeWriter')();
      edgeGenerator.generateSource(protocol, writer, ioGenerator);
      var actual = writer.render();
      assert.strictEqual(actual, expected);
    });
  });
});