var _ = require('lodash');
var capitalizer = require('./capitalizer')();
var compilers = require('./compilers')();

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

  var getReceiveFunctionName = function (method) {
    return '_receive' + capitalizer.toPascalCase(method.name);
  };

  var getReceivePrototypeWithoutSemicolon = function (method) {
    return 'void ' + getReceiveFunctionName(method) + '(void)';
  };

  var getOnPrototype = function (method) {
    return 'void on' + capitalizer.toPascalCase(method.name) + getList(method) + ';';
  };

  var getSendBody = function (method, ioGenerator) {
    method = compilers.compileMethod(method);
    var statements = [];
    _.forEach(method.fields, function (field) {
      statements.push(field.edgeCodec.write(field.name, ioGenerator));
    });
    return statements.join('\n');
  };

  var getReceiveBody = function (method, ioGenerator) {
    method = compilers.compileMethod(method);
    var statements = [];
    var decl = [];
    _.forEach(method.fields, function (field) {
      decl.push(field.name);
    });
    if (decl.length) {
      statements.push('long ' + decl.join(', ') + ';');
    }
    _.forEach(method.fields, function (field) {
      statements.push(field.edgeCodec.read(field.name, ioGenerator));
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
    getListWithoutType: getListWithoutType,
    getReceiveFunctionName: getReceiveFunctionName
  };
};
