var _ = require('lodash');
var deepcopy = require('deepcopy');

module.exports = function () {

  var numberTypes = require('./numberTypes')();

  var compileMethod = function (method) {
    method = deepcopy(method);
    _.forEach(method.fields, function (field) {
      field.gatewayCodec = numberTypes.getGatewayCodec(field);
      field.edgeCodec = numberTypes.getEdgeCodec(field);
    });
    return method;
  };

  var compileProtocol = function (protocol) {
    if (protocol === null || protocol === undefined) {
      return protocol;
    }
    protocol = deepcopy(protocol);
    protocol.services = [];

    _.forEach(protocol.features, function (feature) {
      for (var methodId = 0; methodId < feature.methods.length; methodId++) {
        var method = feature.methods[methodId];
        method = compileMethod(method);
        method.serviceId = protocol.services.length;
        protocol.services.push({
          method: method,
          feature: feature
        });
        feature.methods[methodId] = method;
        feature.methods[method.name] = method;
      }
    });

    var featuresLength = protocol.features.length;
    for (var i = 0; i < featuresLength; i++) {
      protocol.features[protocol.features[i].name] = protocol.features[i];
    }

    var serviceIdType = { type: 'integer', min: 0, max: protocol.services.length - 1 };
    protocol.serviceIdGatewayCodec = numberTypes.getGatewayCodec(serviceIdType);
    protocol.serviceIdEdgeCodec = numberTypes.getEdgeCodec(serviceIdType);
    return protocol;
  };
  return {
    compileMethod: compileMethod,
    compileProtocol: compileProtocol
  };
};