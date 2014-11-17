var crypto = require('crypto');

module.exports = function () {
  var bufferToDwords = function (buffer) {
    return [
      buffer.readUInt32BE(0),
      buffer.readUInt32BE(4),
      buffer.readUInt32BE(8),
      buffer.readUInt32BE(12)
    ];
  };
  var dwordsToString = function (dwords) {
    return [
      dwords[0].toString(16),
      dwords[1].toString(16),
      dwords[2].toString(16),
      dwords[3].toString(16)
    ].join('');
  };
  var stringToBuffer = function (string) {
    var list = [];
    for (var i = 0; i < 32; i += 2) {
      list.push(parseInt(string.slice(i, i + 2), 16));
    }
    return new Buffer(list);
  };

  return  {
    generate: function () {
      return crypto.randomBytes(16);
    },
    bufferToDwords: bufferToDwords,
    dwordsToString: dwordsToString,
    stringToBuffer: stringToBuffer,
    bufferToString: function (buffer) {
      return dwordsToString(bufferToDwords(buffer));
    },
    dwordsToBuffer: function (dwords) {
      return stringToBuffer(dwordsToString(dwords));
    },
    stringToDwords: function (string) {
      return bufferToDwords(stringToBuffer(string));
    }
  };
};