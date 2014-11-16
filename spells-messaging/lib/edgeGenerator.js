var _ = require('lodash');

var methodGenerator = require('./methodGenerator')();
var numberTypes = require('./numberTypes')();

module.exports = function () {
  return {
    generateHeader: function (protocol, writer, ioGenerator, tpl) {
      writer.namespace(protocol.name, function () {
        _.forEach(protocol.features, function (feature) {
          writer.namespace(feature.name, function () {
            _.forEach(feature.methods, function (method) {
              writer.write(methodGenerator.getSendPrototypeWithoutSemicolon(method) + ';');
              writer.write(methodGenerator.getReceivePrototypeWithoutSemicolon(method) + ';');
              writer.write(methodGenerator.getOnPrototype(method));
            });
          });
        });
        writer.write('void _receive(void);');
        writer.write(tpl);
      });
    },
    generateSource: function (protocol, writer, ioGenerator, tpl) {
      writer.namespace(protocol.name, function () {
        var serviceIdCount = 0;
        _.forEach(protocol.features, function (feature) {
          _.forEach(feature.methods, function () {
            serviceIdCount++;
          });
        });
        var serviceIdType = { type: 'integer', min: 0, max: serviceIdCount - 1 };
        var serviceIdCodec = numberTypes.getEdgeCodec(serviceIdType, ioGenerator);
        var serviceId = 0;
        _.forEach(protocol.features, function (feature) {
          writer.namespace(feature.name, function () {
            _.forEach(feature.methods, function (method) {
              writer.write(methodGenerator.getSendPrototypeWithoutSemicolon(method));
              writer.write('{');
              writer.pushIndent();
              writer.write(serviceIdCodec.write(serviceId));
              var body = methodGenerator.getSendBody(method, ioGenerator);
              if (body.length) {
                writer.write(body);
              }
              writer.popIndent();
              writer.write('}');

              writer.write(methodGenerator.getReceivePrototypeWithoutSemicolon(method));
              writer.write('{');
              writer.pushIndent();
              writer.write(methodGenerator.getReceiveBody(method, ioGenerator));
              writer.popIndent();
              writer.write('}');

              serviceId++;
            });
          });
        });
        writer.write('void _receive(void)');
        writer.write('{');
        writer.pushIndent();
        writer.write('long serviceId;');
        writer.write(serviceIdCodec.read('serviceId'));
        writer.write('switch (serviceId)');
        writer.write('{');
        serviceId = 0;
        _.forEach(protocol.features, function (feature) {
          _.forEach(feature.methods, function (method) {
            writer.write('case ' + serviceId + ':');
            writer.pushIndent();
            var featureName = feature.name;
            writer.write(featureName + '::' + methodGenerator.getReceiveFunctionName(method) + '();');
            writer.write('break;');
            writer.popIndent();
            serviceId++;
          });
        });
        writer.write('default:;');
        writer.write('}');
        writer.popIndent();
        writer.write('}');
        writer.write(tpl);
      });
    }
  };
};
