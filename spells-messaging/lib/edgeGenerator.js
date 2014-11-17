var _ = require('lodash');
var methodGenerator = require('./methodGenerator')();
var compilers = require('./compilers')();

module.exports = function () {

  var generateMethod = function (writer, serviceId, method, serviceIdEdgeCodec, ioGenerator) {
    writer.write(methodGenerator.getSendPrototypeWithoutSemicolon(method));
    writer.write('{');
    writer.pushIndent();
    writer.write(ioGenerator.beginWrite());
    writer.write(serviceIdEdgeCodec.write(serviceId, ioGenerator));
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
  };

  var generateFeatureSourceAll = function (protocol, writer, ioGenerator) {
    var serviceId = 0;
    _.forEach(protocol.features, function (feature) {
      writer.namespace(feature.name, function () {
        _.forEach(feature.methods, function (method) {
          generateMethod(writer, serviceId, method, protocol.serviceIdEdgeCodec, ioGenerator);
          serviceId++;
        });
      });
    });
  };

  var generateMainReceiveFunction = function (protocol, writer, ioGenerator) {
    writer.write('void _receive(void)');
    writer.write('{');
    writer.pushIndent();
    writer.write('long serviceId;');
    writer.write(ioGenerator.beginRead());
    writer.write(protocol.serviceIdEdgeCodec.read('serviceId', ioGenerator));
    writer.write('switch (serviceId)');
    writer.write('{');
    var serviceId = 0;
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
    writer.write('default:');
    writer.pushIndent();
    writer.write(ioGenerator.endRead());
    writer.popIndent();
    writer.write('}');
    writer.popIndent();
    writer.write('}');
  };

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
      protocol = compilers.compileProtocol(protocol);
      writer.namespace(protocol.name, function () {
        generateFeatureSourceAll(protocol, writer, ioGenerator);
        generateMainReceiveFunction(protocol, writer, ioGenerator);
        writer.write(tpl);
      });
    }
  };
};
