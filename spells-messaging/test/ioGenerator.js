var assert = require('assert');
var helper = require('./helper');

describe('ioGenerator', function () {
  var ioGenerator = require('../lib/ioGenerator')();
  helper.checkFunctionExists(ioGenerator, 'readBytesBiased');
  helper.checkFunctionExists(ioGenerator, 'writeBytesBiased');

  it('readBytesBiased에서 예상되는 결과를 얻어야 합니다.', function () {
    var expected = '';
    expected += '{\n';
    expected += '\tlong __temp__ = 0;\n';
    expected += '\t__temp__ |= _read();\n';
    expected += '\t__temp__ <<= 8;\n';
    expected += '\t__temp__ |= _read();\n';
    expected += '\t__temp__ <<= 8;\n';
    expected += '\t__temp__ |= _read();\n';
    expected += '\t__temp__ <<= 8;\n';
    expected += '\t__temp__ |= _read();\n';
    expected += '\t__temp__ += -1000;\n';
    expected += '\tabc = __temp__;\n';
    expected += '}';
    var actual = ioGenerator.readBytesBiased(4, 'unsigned long', -1000, 'abc');
    assert.strictEqual(actual, expected);
  });
  it('writeBytesBiased에서 예상되는 결과를 얻어야 합니다.', function () {
    var expected = '';
    expected += '{\n';
    expected += '\tlong __temp__ = 42;\n';
    expected += '\t__temp__ -= 4000;\n';
    expected += '\t_write(__temp__ & 0xFF);\n';
    expected += '\t__temp__ >>= 8;\n';
    expected += '\t_write(__temp__ & 0xFF);\n';
    expected += '}';
    var actual = ioGenerator.writeBytesBiased(2, 'unsigned int', 4000, 42);
    assert.strictEqual(actual, expected);
  });
});
