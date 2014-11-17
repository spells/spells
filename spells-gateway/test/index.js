describe('index.js', function () {
  it('함수가 있어야 합니다.', function () {
    require('../')();
  });
});

require('./gateway');
require('./transport');
require('./stack');
require('./deviceId');
require('./master');