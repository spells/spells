
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
      var separatorIndex = text.indexOf('?');
      var body = base64.decode(text.substr(0, separatorIndex));
      var checksum1 = base64.decode(text.substr(separatorIndex + 1));
      var checksum2 = crc24Buffer(body);
      for (var i = 0; i < 3; i++) {
        if (checksum1[i] !== checksum2[i]) {
          throw new Error();
        }
      }
      return body;
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