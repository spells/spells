var codeWriter = require('./codeWriter');

module.exports = function () {
  var checkBytes = function (bytes) {
    if (bytes !== 1 && bytes !== 2 && bytes !== 4) {
      throw new Error();
    }
  };
  return {
    beginRead: function () {
      return '_beginRead();';
    },
    endRead: function () {
      return '_endRead();';
    },
    beginWrite: function () {
      return '_beginWrite();';
    },
    endWrite: function () {
      return '_endWrite();';
    },
    readBytesBiased: function (bytes, type, min, target) {
      checkBytes(bytes);
      var writer = codeWriter();
      writer.write('{');
      writer.pushIndent();
      writer.write('long __temp__ = 0;');
      if (bytes === 1) {
        writer.write('__temp__ |= _read();');
      }
      if (bytes === 2) {
        writer.write('__temp__ |= _read();');
        writer.write('__temp__ <<= 8;');
        writer.write('__temp__ |= _read();');
      }
      if (bytes === 4) {
        writer.write('__temp__ |= _read();');
        writer.write('__temp__ <<= 8;');
        writer.write('__temp__ |= _read();');
        writer.write('__temp__ <<= 8;');
        writer.write('__temp__ |= _read();');
        writer.write('__temp__ <<= 8;');
        writer.write('__temp__ |= _read();');
      }
      writer.write('__temp__ += ' + min + ';');
      writer.write(target + ' = __temp__;');
      writer.popIndent();
      writer.write('}');
      return writer.render();
    },
    writeBytesBiased: function (bytes, type, min, target) {
      checkBytes(bytes);
      var writer = codeWriter();
      writer.write('{');
      writer.pushIndent();
      writer.write('long __temp__ = ' + target + ';');
      writer.write('__temp__ -= ' + min + ';');
      if (bytes === 1) {
        writer.write('_write(__temp__ & 0xFF);');
      }
      if (bytes === 2) {
        writer.write('_write(__temp__ & 0xFF);');
        writer.write('__temp__ >>= 8;');
        writer.write('_write(__temp__ & 0xFF);');
      }
      if (bytes === 4) {
        writer.write('_write(__temp__ & 0xFF);');
        writer.write('__temp__ >>= 8;');
        writer.write('_write(__temp__ & 0xFF);');
        writer.write('__temp__ >>= 8;');
        writer.write('_write(__temp__ & 0xFF);');
        writer.write('__temp__ >>= 8;');
        writer.write('_write(__temp__ & 0xFF);');
      }
      writer.popIndent();
      writer.write('}');
      return writer.render();
    }
  };
};