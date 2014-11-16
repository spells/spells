
var crc = require('crc');

module.exports = function () {
  
  var crc24 = function (value) {
    return crc.crc24(value);
  };

  var base64 = {};
  base64.encode = function (buffer) {
    return buffer.toString('base64');
  };
  base64.decode = function (text) {
    var buffer = new Buffer(text, 'base64');
    if (base64.encode(buffer) !== text) {
      throw new Error();
    }
    return buffer;
  };

  var crc24Buffer = function (value) {
    var checksum = crc24(value);
    var buffer = new Buffer(3);
    buffer[0] = (checksum & 0x00FF0000) >> 16;
    buffer[1] = (checksum & 0x0000FF00) >> 8;
    buffer[2] = (checksum & 0x000000FF) >> 0;
    return buffer;
  };

  var armor = {
    encode: function (buffer) {
      var bodyBase64 = base64.encode(buffer);
      var checksumBuffer = crc24Buffer(buffer);
      var checksumBase64 = base64.encode(checksumBuffer);
      return bodyBase64 + '?' + checksumBase64;
    },
    decode: function (text) {
      text = text;
      var q = text.indexOf('?');
      var before = text.substr(0, q);
      var after = text.substr(q + 1);
      var beforeBuffer = base64.decode(before);
      
      var afterBuffer = base64.decode(after);
      var checksumBuffer = crc24Buffer(beforeBuffer);
      for (var i = 0; i < 3; i++) {
        if (afterBuffer[i] !== checksumBuffer[i]) {
          throw new Error();
        }
      }
      return beforeBuffer;
    }
  };

  return {
    checksum: {
      crc24: crc24
    },
    base64: base64,
    armor: armor
  };
};