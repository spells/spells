var stack = require('./stack')();
var transport = require('./transport')();
var _ = require('lodash');

module.exports = function (protocol) {
  var subscribers = [];
  var emit = function (data) {
    _.forEach(subscribers, function (callback) {
      process.nextTick(function () {
        callback(data);
      });
    });
  };
  var on = function (callback) {
    subscribers.push(callback);
  };
  var encode = function (payload, method) {
    payload = stack.applicationLayer.encode(payload, method, protocol);
    payload = transport.frame.encode(payload);
    return new Buffer(payload, 'utf8');
  };
  var decode = function (data) {
    data = stack.applicationLayer.decode(data, protocol);
    return data;
  };
  var decodeAsyncSafely = function (data) {
    try {
      data = decode(data);
      emit(data);
    } catch(e) {
    }
  };
  return {
    encode: encode,
    decode: decode,
    decodeAsyncSafely: decodeAsyncSafely,
    on: on
  };
};