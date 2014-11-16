var assert = require('assert');
var helper = require('./helper');

describe('gateway', function () {

  var gateway = require('../lib/gateway')();
  
  it('모듈이 있어야 합니다.', function () {
    assert.ok(gateway);
  });

  helper.checkFunctionExists(gateway, 'run');
});
