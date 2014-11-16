var numberTypes = require('./numberTypes')();
var capitalizer = require('./capitalizer')();

module.exports = function () {

  var writeReceiveFeatureBody = function (feature, writer, ioGenerator) {
    var methods = feature.methods;
    var count = methods.length;
    var type = { type: 'integer', min: 0, max: count - 1 };
    writer.write('long methodId;');
    writer.write(numberTypes.getEdgeCodec(type, ioGenerator).read('methodId'));
    writer.write('switch (methodId)');
    writer.write('{');
    for (var methodId = 0; methodId < count; methodId++) {
      writer.write('case ' + methodId + ':');
      writer.pushIndent();
      var methodName = methods[methodId].name;
      writer.write('_receive' + capitalizer.toPascalCase(methodName) + '();');
      writer.write('break;');
      writer.popIndent();
    }
    writer.write('default:;');
    writer.write('}');
  };

  var getReceiveFeaturePrototypeWithoutSemicolon = function () {
    var funcName = '_receive';
    return 'void ' + funcName + '(void)';
  };

  var writeReceiveFeature = function (feature, writer, ioGenerator, writeBody) {
    writer.write(getReceiveFeaturePrototypeWithoutSemicolon());
    writer.write('{');
    writer.pushIndent();
    writeBody(feature, writer, ioGenerator);
    writer.popIndent();
    writer.write('}');
  };

  return {
    writeReceiveFeature: writeReceiveFeature,
    writeReceiveFeatureBody: writeReceiveFeatureBody,
    getReceiveFeaturePrototypeWithoutSemicolon: getReceiveFeaturePrototypeWithoutSemicolon
  };
};
