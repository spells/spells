module.exports = function () {
  return {
    decisionType: function (data) {
      if (typeof data !== 'object' ||
        data.type === null || data.type === undefined ||
        data.min === null || data.max === null) {
        throw new Error();
      }
      if (data.type !== 'integer') {
        throw new Error();
      }
      if (data.min === undefined) {
        throw new Error();
      }
      if (data.max === undefined) {
        return 'unsigned long';
      }
      if (data.max < data.min) {
        throw new Error();
      }
      var distance = data.max - data.min;
      if (distance < 256) {
        return 'unsigned char';
      }
      if (distance < 65536) {
        return 'unsigned int'; 
      }
      if (distance < 4294967296) {
        return 'unsigned long';
      }
      throw new Error();
    }
  };
};