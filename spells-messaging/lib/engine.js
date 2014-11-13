var dot = require('dot');

module.exports = function (writer, templates) {
  var capitalise = function (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return function (method) {
    var nameCamel = method.name;
    var namePascal = capitalise(method.name);
    var 
  };
};