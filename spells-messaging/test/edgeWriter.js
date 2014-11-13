var assert = require('assert');
describe('edgeWriter', function () {
  var edgeWriter = require('../lib/edgeWriter')();
  it('몇 가지 함수가 있어야 합니다.', function () {
    assert.strictEqual(typeof edgeWriter, 'object');
    assert.strictEqual(typeof edgeWriter.writeHeader, 'function');
    assert.strictEqual(typeof edgeWriter.writeSource, 'function');
    assert.strictEqual(typeof edgeWriter.renderHeader, 'function');
    assert.strictEqual(typeof edgeWriter.renderSource, 'function');
  });
  it('제대로 동작되어야 합니다.', function () {
    assert.strictEqual(edgeWriter.renderSource(), '');
    assert.strictEqual(edgeWriter.renderHeader(), '');
    edgeWriter.writeSource('source1');
    edgeWriter.writeHeader('header1');
    assert.strictEqual(edgeWriter.renderSource(), 'source1');
    assert.strictEqual(edgeWriter.renderHeader(), 'header1');
    edgeWriter.writeSource('source2');
    edgeWriter.writeHeader('header2');
    assert.strictEqual(edgeWriter.renderSource(), 'source1\nsource2');
    assert.strictEqual(edgeWriter.renderHeader(), 'header1\nheader2');
  });
});