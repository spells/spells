module.exports = function () {
  return {
    beginRead: function () {
      return 'beginRead';
    },
    endRead: function () {
      return 'endRead';
    },
    beginWrite: function () {
      return 'beginWrite';
    },
    endWrite: function () {
      return 'endWrite';
    },
    readBytesBiased: function (bytes, type, min, target) {
      return 'read:' + bytes + ':' + type + ':' + min + ':' + target;
    },
    writeBytesBiased: function (bytes, type, min, target) {
      return 'write:' + bytes + ':' + type + ':' + min + ':' + target;
    }
  };
};