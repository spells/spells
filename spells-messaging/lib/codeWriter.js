var _ = require('lodash');

var newLine = '\n';
var tab = '\t';

module.exports = function () {

  var code = [];
  var indent = 0;

  var write = function (content) {
    
    if (content.split('\n').join('') !== content)
    {
      _.forEach(content.split('\n'), function (line) {
        write(line);
      });
      return;
    }

    for (var i = 0; i < indent; i++) {
      content = tab + content;
    }
    code.push(content);
  };
  var pushIndent = function () {
    indent++;
  };
  var popIndent = function () {
    if (indent === 0) {
      throw new Error();
    }
    indent--;
  };
  var namespace = function (name, func) {
    write('namespace ' + name);
    write('{');
    pushIndent();
    func();
    popIndent();
    write('}');
  };
  var render = function () {
    return code.join(newLine);
  };

  return {
    write: write,
    namespace: namespace,
    render: render,
    pushIndent: pushIndent,
    popIndent: popIndent
  };
};