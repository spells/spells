module.exports = function () {

  var deviceIdLayer = {};
  deviceIdLayer.encode = function (featureLayerEncoded, deviceId) {
    var deviceIdBuffer = new Buffer(deviceId, 'hex');
    var result = Buffer.concat([deviceIdBuffer, featureLayerEncoded]);
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
  serviceIdLayer.encode = function () {

  };
  serviceIdLayer.decode = function () {
  };

  var applicationLayer = {};
  applicationLayer.encode = function () {
  };
  applicationLayer.decode = function () {
  };

  return {
    deviceIdLayer: deviceIdLayer,
    serviceIdLayer: serviceIdLayer,
    applicationLayer: applicationLayer
  };
};
