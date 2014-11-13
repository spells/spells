module.exports = function () {
  return function () {
    var header = '', source = '';
    return {
      writeHeader: function (content) {
        header += content;
      },
      writeSource: function (content) {
        source += content;
      },
      renderHeader: function () {
        return header;
      },
      renderSource: function () {
        return source;
      }
    };
  };
};