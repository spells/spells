var stack = require('./stack')();
var transport = require('./transport')();

module.exports = function (protocol) {
  return {
    encode: function (payload, method) {
      payload = stack.applicationLayer.encode(payload, method, protocol);
      payload = transport.frame.encode(payload);
      return payload;
    },
    decode: function (data) {
      data = transport.frame.decode(data);
      data = stack.applicationLayer.decode(data, protocol);
      return data;
    }
  };
};