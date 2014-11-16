
var crc = require('crc');

module.exports = function () {
  
  var crc24 = function (value) {
    return crc.crc24(value);
  };

  var base64 = {
    encode: function (buffer) {
      return buffer;
    },
    decode: function (text) {
      return text;
    }
  };

  return {
    checksum: {
      crc24: crc24
    },
    base64: base64
  };
};