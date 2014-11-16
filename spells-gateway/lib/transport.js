
var crc = require('crc');

module.exports = function () {
  
  var crc24 = function (value) {
    return crc.crc24(value);
  };
  
  var parseText = function () {
  };

  return {
    checksum: {
      crc24: crc24
    },
    parseText: parseText
  };
};