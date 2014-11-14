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
      });
    }
  };
};

/*
namespace proto1
{
  namespace f1
  {
    void _receive(void);
    void sendM0(void);
    void _receiveM0(void);
    void onM0(void);
    void sendM3(long a, long b, long c);
    void _receiveM3(void);
    void onM3(long a, long b, long c);
  }
  namespace f2
  {
    void _receive(void);
    void sendK0(void);
    void _receiveK0(void);
    void onK0(void);
    void sendK3(long one, long two, long three);
    void _receiveK3(void);
    void onK3(long one, long two, long three);
  }
  void _receive(void);
}
*/