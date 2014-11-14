module.exports = function () {
  var checkOption = function checkOption(option) {
    if (typeof option !== 'object' ||
      option.type === null || option.type === undefined ||
      option.min === null || option.max === null) {
      return false;
    }
    if (option.type !== 'integer') {
      return false;
    }
    if (option.min === undefined) {
      return false;
    }
    if (typeof option !== 'object' ||
      option.type === null || option.type === undefined ||
      option.min === null || option.max === null) {
      return false;
    }
    if (option.type !== 'integer') {
      return false;
    }
    if (option.min === undefined) {
      return false;
    }
    if (option.max !== undefined && option.max < option.min) {
      return false;
    }
  };
  var decisionType = function (option) {
    if (checkOption(option) === false) {
      throw new Error();
    }
    if (option.max === undefined) {
      return 'unsigned long';
    }
    var distance = option.max - option.min;
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
  };
  var typeToBytes = function (type) {
    if (type === 'unsigned char') {
      return 1;
    }
    if (type === 'unsigned int') {
      return 2;
    }
    if (type === 'unsigned long') {
      return 4;
    }
    throw new Error();
  };
  var getEdgeCodec = function (option, ioGenerator) {
    if (checkOption(option) === false) {
      throw new Error();
    }
    var type = decisionType(option);
    var size = typeToBytes(type);
    return {
      read: function (target) {
        return ioGenerator.readBytesBiased(size, type, option.min, target);
      },
      write: function (target) {
        return ioGenerator.writeBytesBiased(size, type, option.min, target);
      }
    };
  };
  var getGatewayCodec = function (option) {
    if (checkOption(option) === false) {
      throw new Error();
    }
    var distance = option.max - option.min;
    return {
      encode: function (i) {
        if (option.min > i || option.max < i) {
          throw new Error();
        }
        return i - option.min;
      },
      decode: function (i) {
        if (i < 0 || distance < i) {
          throw new Error();
        }
        return i + option.min;
      }
    };
  };
  return {
    decisionType: decisionType,
    typeToBytes: typeToBytes,
    getEdgeCodec: getEdgeCodec,
    getGatewayCodec: getGatewayCodec
  };
};