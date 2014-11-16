var assert = require('assert');

describe('index.js', function () {
  it('함수가 있어야 합니다.', function () {
    require('../')();
  });
  var index = require('../')();
  it('capitalizer를 노출해야 합니다.', function () {
    assert.strictEqual(index.capitalizer, require('../lib/capitalizer'));
  });
  it('edgeGenerator를 노출해야 합니다.', function () {
    assert.strictEqual(index.edgeGenerator, require('../lib/edgeGenerator'));
  });
  it('numberTypes를 노출해야 합니다.', function () {
    assert.strictEqual(index.numberTypes, require('../lib/numberTypes'));
  });
});

require('./capitalizer');
require('./numberTypes');
require('./codeWriter');
require('./methodGenerator');
require('./featureGenerator');
require('./edgeGenerator');
require('./ioGenerator');
