var compilers = require('../../spells-messaging/lib/compilers')();

var method0 = {
  name: 'm0',
  fields: []
};
var method3 = {
  name: 'm3',
  fields: [
    { name: 'a1Bc', type: 'integer', min: -100, max: 100 },
    { name: 'e2Fg', type: 'integer', min: -1000, max: 1000 },
    { name: 'i3Jk', type: 'integer', min: -50000, max : 50000 }
  ]
};
var feature = {
  name: 'f03',
  methods: [
    method0,
    method3
  ]
};
var protocol = {
  name: 'pf03',
  features: [feature]
};

protocol = compilers.compileProtocol(protocol);
method0 = protocol.features[0].methods[0];
method3 = protocol.features[0].methods[1];
var master = require('../lib/master')(protocol);
var transport = require('../lib/transport')();

var assert = require('assert');

describe('master', function () {
  it('encode 및 decode 반복 검사를 통과해야 합니다.', function () {
    var payload = {
      a1Bc: 64,
      e2Fg: 567,
      i3Jk: 50000
    };
    var actual = master.decode(
      transport.frame.decode(
        master.encode(
          master.decode(
            transport.frame.decode(
              master.encode(payload, method3).toString()
            )
          ).payload,
          method3
        ).toString()
      )
    ).payload;

    assert.deepEqual(actual, payload);
  });
  it('안전한 이벤트를 지원해야 합니다.', function (done) {
    var payload = {
      a1Bc: 64,
      e2Fg: 567,
      i3Jk: 50000
    };
    master.on(function (data) {
      assert.deepEqual(payload, data.payload);
      done();
    });
    master.decodeAsyncSafely(
      transport.frame.decode(
        master.encode(payload, method3).toString()
      )
    );
  });
});