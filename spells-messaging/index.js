module.exports = function () {
  return {
    capitalizer: require('./lib/capitalizer'),
    edgeGenerator: require('./lib/edgeGenerator'),
    numberTypes: require('./lib/numberTypes')
  };
};
/*
var _ = require('lodash');
module.exports = function (protocol) {
  var server = {};

  _.forEach(protocol.features, function (feature) {
    server[feature.name] = {
      on: function (methodName, callback) {
        callback(args);
      }
    };
    _.forEach(feature.methods, function (method) {
      server[feature.name]
    });
  });
  
  return server;
};
*/