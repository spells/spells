var _ = require('lodash');
var numberTypes = require('./numberTypes')();
var capitalizer = require('./capitalizer')();

module.exports = function () {

  var getList = function (method) {
    var args = [];
    _.forEach(method.fields, function (field) {
      args.push('long ' + field.name);
    });
    if (args.length === 0) {
      return '(void)';
    }
    return '(' + args.join(', ') + ')';
  };

  var getSendPrototypeWithoutSemicolon = function (method) {
    return 'void send' + capitalizer.toPascalCase(method.name) + getList(method);
  };

  var getReceivePrototypeWithoutSemicolon = function (method) {
    return 'void receive' + capitalizer.toPascalCase(method.name) + getList(method);
  };

  var getSendBody = function (method, ioGenerator) {
    var statements = [];
    _.forEach(method.fields, function (field) {
      var name = field.name;
      var type = numberTypes.decisionType(field);
      var size = numberTypes.typeToBytes(type);
      statements.push(ioGenerator.readBytesBiased(size, type, field.min, name));
      statements.push('\n');
    });
    return statements.join('');
  };

  var getReceiveBody = function (method, ioGenerator) {
    var statements = [];
    _.forEach(method.fields, function (field) {
      var name = field.name;
      var type = numberTypes.decisionType(field);
      var size = numberTypes.typeToBytes(type);
      statements.push(ioGenerator.writeBytesBiased(size, type, field.min, name));
      statements.push('\n');
    });
    return statements.join('');
  };

  return {
    getList: getList,
    getSendBody: getSendBody,
    getReceiveBody: getReceiveBody,
    getSendPrototypeWithoutSemicolon: getSendPrototypeWithoutSemicolon,
    getReceivePrototypeWithoutSemicolon: getReceivePrototypeWithoutSemicolon
  };
};
