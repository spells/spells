var assert = require('assert');
describe('codeWriter', function () {
  var codeWriter = require('../lib/codeWriter')();
  it('몇 가지 함수가 있어야 합니다.', function () {
    assert.strictEqual(typeof codeWriter, 'object');
    assert.strictEqual(typeof codeWriter.write, 'function');
    assert.strictEqual(typeof codeWriter.render, 'function');
    assert.strictEqual(typeof codeWriter.namespace, 'function');
  });
  it('제대로 동작되어야 합니다.', function () {
    assert.strictEqual(codeWriter.render(), '');
    codeWriter.write('one1');
    assert.strictEqual(codeWriter.render(), 'one1');
    codeWriter.write('two2');
    assert.strictEqual(codeWriter.render(), 'one1\ntwo2');
    codeWriter.namespace('spells', function () {
      codeWriter.write('func1');
      codeWriter.namespace('inner', function () {
        codeWriter.write('func2');
      });
      codeWriter.write('func3');
    });
    var e = [];
    e.push('one1');
    e.push('two2');
    e.push('namespace spells');
    e.push('{');
    e.push('\tfunc1');
    e.push('\tnamespace inner');
    e.push('\t{');
    e.push('\t\tfunc2');
    e.push('\t}');
    e.push('\tfunc3');
    e.push('}');
    assert.strictEqual(codeWriter.render(), e.join('\n'));
  });
});
