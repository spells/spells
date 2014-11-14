module.exports = function () {
  return {
    generateHeader: function (protocol, writer) {
      writer.namespace(protocol.name, function () {
      });
    },
    generateSource: function (protocol, writer) {
      writer.namespace(protocol.name, function () {
      });
    }
  };
};