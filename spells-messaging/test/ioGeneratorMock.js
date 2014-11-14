module.exports = function () {
  return {
    readBytesBiased: function (bytes, type, min, target) {
      return 'read:' + bytes + ':' + type + ':' + min + ':' + target;
    },
    writeBytesBiased: function (bytes, type, min, target) {
      return 'write:' + bytes + ':' + type + ':' + min + ':' + target;
    }
  };
};