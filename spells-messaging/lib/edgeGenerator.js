var _ = require('lodash');

var featureGenerator = require('./featureGenerator')();
var methodGenerator = require('./methodGenerator')();
var numberTypes = require('./numberTypes')();

module.exports = function () {
  return {
    generateHeader: function (protocol, writer, ioGenerator) {
      writer.namespace(protocol.name, function () {
        _.forEach(protocol.features, function (feature) {
          writer.namespace(feature.name, function () {
            writer.write(featureGenerator.getReceiveFeaturePrototypeWithoutSemicolon(feature) + ';');
            _.forEach(feature.methods, function (method) {
              writer.write(methodGenerator.getSendPrototypeWithoutSemicolon(method) + ';');
              writer.write(methodGenerator.getReceivePrototypeWithoutSemicolon(method) + ';');
              writer.write(methodGenerator.getOnPrototype(method));
            });
          });
        });
        writer.write('void _receive(void);')
      });
    },
    generateSource: function (protocol, writer, ioGenerator) {
      writer.namespace(protocol.name, function () {
        var featureId = 0;
        var featureIdCodec = numberTypes.getEdgeCodec({ type: 'integer', min: 0, max: protocol.features.length - 1}, ioGenerator);
        _.forEach(protocol.features, function (feature) {
          writer.namespace(feature.name, function () {
            featureGenerator.writeReceiveFeature(feature, writer, ioGenerator, featureGenerator.writeReceiveFeatureBody);
            var methodId = 0;
            var methodIdCodec = numberTypes.getEdgeCodec({ type: 'integer', min: 0, max: feature.methods.length - 1}, ioGenerator);
            _.forEach(feature.methods, function (method) {
              
              writer.write(methodGenerator.getSendPrototypeWithoutSemicolon(method));
              writer.write('{');
              writer.pushIndent();
              writer.write(featureIdCodec.write(featureId));
              writer.write(methodIdCodec.write(methodId));
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

              methodId++;
            });
          });
          featureId++;
        });
        writer.write('void _receive(void)');
        writer.write('{');
        writer.pushIndent();
        var type = { type: 'integer', min: 0, max: protocol.features.length - 1 };
        writer.write('long featureId;');
        writer.write(numberTypes.getEdgeCodec(type, ioGenerator).read('featureId'));
        writer.write('switch (featureId)');
        writer.write('{');
        for (var featureId = 0; featureId < protocol.features.length; featureId++) {
          writer.write('case ' + featureId + ':');
          writer.pushIndent();
          var featureName = protocol.features[featureId].name;
          writer.write(featureName + '::_receive();');
          writer.write('break;');
          writer.popIndent();
        }
        writer.write('default:;');
        writer.write('}');
        writer.popIndent();
        writer.write('}');
      });
    }
  };
};
