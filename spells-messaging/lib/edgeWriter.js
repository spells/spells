module.exports = function () {
  const newLine = '\n';

  var h = [];
  var cpp = [];
  return {
    writeHeader: function (content) {
      h.push(content);
    },
    writeSource: function (content) {
      cpp.push(content);
    },
    renderHeader: function (content) {
      return h.join(newLine);
    },
    renderSource: function (content) {
      return cpp.join(newLine);
    }
  };
};