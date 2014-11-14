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
  var getListWithoutType = function (method) {
    var args = _.map(method.fields, function (field) {
      return field.name;
    });
    return '(' + args.join(', ') + ')';
  };

  var getSendPrototypeWithoutSemicolon = function (method) {
    return 'void send' + capitalizer.toPascalCase(method.name) + getList(method);
  };

  var getReceivePrototypeWithoutSemicolon = function (method) {
    return 'void _receive' + capitalizer.toPascalCase(method.name) + '(void)';
  };

  var getOnPrototype = function (method) {
    return 'void on' + capitalizer.toPascalCase(method.name) + getList(method) + ';';
  };

  var getSendBody = function (method, ioGenerator) {
    var statements = [];
    _.forEach(method.fields, function (field) {
      statements.push(numberTypes.getEdgeCodec(field, ioGenerator).write(field.name));
    });
    return statements.join('\n');
  };

  var getReceiveBody = function (method, ioGenerator) {
    var statements = [];
    var decl = [];
    _.forEach(method.fields, function (field) {
      decl.push(field.name);
    });
    if (decl.length) {
      statements.push('long ' + decl.join(', ') + ';');
    }
    _.forEach(method.fields, function (field) {
      statements.push(numberTypes.getEdgeCodec(field, ioGenerator).read(field.name));
    });
    statements.push('on' + capitalizer.toPascalCase(method.name) + getListWithoutType(method) + ';');
    return statements.join('\n');
  };

  return {
    getList: getList,
    getSendBody: getSendBody,
    getReceiveBody: getReceiveBody,
    getSendPrototypeWithoutSemicolon: getSendPrototypeWithoutSemicolon,
    getReceivePrototypeWithoutSemicolon: getReceivePrototypeWithoutSemicolon,
    getOnPrototype: getOnPrototype,
    getListWithoutType: getListWithoutType
  };
};
