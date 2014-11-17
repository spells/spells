var _ = require('lodash');

module.exports = function () {

  var deviceIdLayer = {};
  deviceIdLayer.encode = function (deviceId, payload) {
    var deviceIdBuffer = new Buffer(deviceId, 'hex');
    var result = Buffer.concat([deviceIdBuffer, payload]);
    return result;
  };
  deviceIdLayer.decode = function (buffer) {
    if (buffer.length < 16) {
      throw new Error();
    }
    var deviceIdBuffer = buffer.slice(0, 16);
    var deviceId = deviceIdBuffer.toString('hex');
    return {
      deviceId: deviceId,
      payload: buffer.slice(16)
    };
  };

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
    var buffers = [
      protocol.serviceIdGatewayCodec.encode(method.serviceId)    
    ];
    _.forEach(method.fields, function (field) {
      buffers.push(field.gatewayCodec.encode(payload[field.name]));
    });
    return Buffer.concat(buffers);
  };
  applicationLayer.decode = function (buffer, method) {
    buffer = buffer;
    method = method;
  };

  return {
    deviceIdLayer: deviceIdLayer,
    serviceIdLayer: serviceIdLayer,
    applicationLayer: applicationLayer
  };
};
