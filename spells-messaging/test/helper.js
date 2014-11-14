var assert = require('assert');

module.exports = {
  checkFunctionExists: function (obj, name) {
    it('함수 ' + name + ' 있어야 합니다.', function () {
      assert.strictEqual(typeof obj[name], 'function');
    });
  }
};