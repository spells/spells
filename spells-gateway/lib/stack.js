var _ = require('lodash');

module.exports = function () {

  var serviceIdLayer = {};
  serviceIdLayer.encode = function (serviceId, payload, codec) {
    var serviceIdBuffer = codec.encode(serviceId);
    var result = Buffer.concat([serviceIdBuffer, payload]);
    return result;
  };
  serviceIdLayer.decode = function (buffer, codec) {
    var serviceIdBuffer = buffer.slice(0, codec.size);
    var serviceId = codec.decode(serviceIdBuffer);
    return {
      serviceId: serviceId,
      payload: buffer.slice(codec.size)
    };
  };

  var applicationLayer = {};
  applicationLayer.encode = function (payload, method, protocol) {
    var buffers = [];
    _.forEach(method.fields, function (field) {
      buffers.push(field.gatewayCodec.encode(payload[field.name]));
    });
    payload = Buffer.concat(buffers);
    return serviceIdLayer.encode(method.serviceId, payload, protocol.serviceIdGatewayCodec);
  };
  applicationLayer.decode = function (data, protocol) {
    data = serviceIdLayer.decode(data, protocol.serviceIdGatewayCodec);
    var serviceId = data.serviceId;
    var method = protocol.services[serviceId].method;
    var feature = protocol.services[serviceId].feature;
    data = data.payload;
    var decoded = {};

    _.forEach(method.fields, function (field) {
      var view = data.slice(0, field.gatewayCodec.size);
      decoded[field.name] = field.gatewayCodec.decode(view);
      data = data.slice(field.gatewayCodec.size);
    });

    if (data.length) {
      throw new Error();
    }

    return {
      serviceId: serviceId,
      method: method,
      feature: feature,
      payload: decoded
    };
  };

  return {
    serviceIdLayer: serviceIdLayer,
    applicationLayer: applicationLayer
  };
};
