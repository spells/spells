var assert = require('assert');
var helper = require('./helper');
var _ = require('lodash');

describe('compilers', function () {

  var compilers = require('../lib/compilers')();
  
  helper.checkFunctionExists(compilers, 'compileProtocol');
  helper.checkFunctionExists(compilers, 'compileMethod');

  var feature1 = {
    name: 'f1',
    methods: [
      {
        name: 'm0',
        fields: []
      },
      {
        name: 'm3',
        fields: [
          { name: 'a', type: 'integer', min: -100, max: 100 },
          { name: 'b', type: 'integer', min: -1000, max: 1000 },
          { name: 'c', type: 'integer', min: -50000, max : 50000 }
        ]
      }
    ]
  };
  var feature2 = {
    name: 'f2',
    methods: [
      {
        name: 'k0',
        fields: []
      },
      {
        name: 'k3',
        fields: [
          { name: 'one', type: 'integer', min: -100, max: 100 },
          { name: 'two', type: 'integer', min: -1000, max: 1000 },
          { name: 'three', type: 'integer', min: -50000, max : 50000 }
        ]
      }
    ]
  };
  var protocol = {
    name: 'proto1',
    features: [
      feature1,
      feature2
    ]
  };

  describe('compileProtocol', function () {
    it('null이 입력되면 null을 반환해야 합니다.', function () {
      assert.strictEqual(compilers.compileProtocol(null), null);
    });
    it('undefined가 입력되면 undefined를 반환해야 합니다.', function () {
      assert.strictEqual(compilers.compileProtocol(undefined), undefined);
    });
    describe('수행 결과를 검사합니다.', function () {
      var result = compilers.compileProtocol(protocol);
      it('결과가 있어야 합니다.', function () {
        assert.ok(result);
      });
      it('feature 2개가 있어야 합니다.', function () {
        assert.strictEqual(result.features.length, 2);
      });
      it('features 2개가 이름으로 지정되어야 합니다.', function () {
        assert.ok(result.features.f1);
        assert.ok(result.features.f2);
        assert.strictEqual(result.features.f1, result.features[0]);
        assert.strictEqual(result.features.f2, result.features[1]);
      });
      it('methods가 이름으로 지정되어야 합니다.', function () {
        assert.ok(result.features.f1.methods.m0);
        assert.ok(result.features.f1.methods.m3);
        assert.ok(result.features.f2.methods.k0);
        assert.ok(result.features.f2.methods.k3);
        assert.strictEqual(result.features.f1.methods[0], result.features[0].methods.m0);
        assert.strictEqual(result.features.f1.methods[1], result.features[0].methods.m3);
        assert.strictEqual(result.features.f2.methods[0], result.features[1].methods.k0);
        assert.strictEqual(result.features.f2.methods[1], result.features[1].methods.k3);
      });
      it('두 feature에 각각 method 2개가 있어야 합니다.', function () {
        assert.strictEqual(result.features[0].methods.length, 2);
        assert.strictEqual(result.features[1].methods.length, 2);
      });
      it('모든 method에 올바른 serviceId가 지정되어야 합니다.', function () {
        var serviceId = 0;
        _.forEach(result.features, function (feature) {
          _.forEach(feature.methods, function (method) {
            assert.strictEqual(method.serviceId, serviceId);
            serviceId = serviceId + 1;
          });
        });
      });
      it('serviceId에 대한 gatewayCodec과 edgeCodec이 지정되어야 합니다.', function () {
        assert.strictEqual(typeof result.serviceIdGatewayCodec, 'object');
        assert.strictEqual(typeof result.serviceIdEdgeCodec, 'object');
        assert.strictEqual(typeof result.serviceIdGatewayCodec.encode, 'function');
        assert.strictEqual(typeof result.serviceIdGatewayCodec.decode, 'function');
        assert.strictEqual(typeof result.serviceIdEdgeCodec.write, 'function');
        assert.strictEqual(typeof result.serviceIdEdgeCodec.read, 'function');
      });
      it('서비스 테이블이 생성되어야 합니다.', function () {
        assert.strictEqual(result.services[0].feature, result.features[0]);
        assert.strictEqual(result.services[1].feature, result.features[0]);
        assert.strictEqual(result.services[2].feature, result.features[1]);
        assert.strictEqual(result.services[3].feature, result.features[1]);
        assert.strictEqual(result.services[0].method, result.features[0].methods[0]);
        assert.strictEqual(result.services[1].method, result.features[0].methods[1]);
        assert.strictEqual(result.services[2].method, result.features[1].methods[0]);
        assert.strictEqual(result.services[3].method, result.features[1].methods[1]);
      });
      it('모든 field에 gatewayCodec과 edgeCodec이 지정되어야 합니다.', function () {
        _.forEach(result.features, function (feature) {
          _.forEach(feature.methods, function (method) {
            _.forEach(method.fields, function (field) {
              assert.strictEqual(typeof field.gatewayCodec, 'object');
              assert.strictEqual(typeof field.edgeCodec, 'object');
              assert.strictEqual(typeof field.gatewayCodec.encode, 'function');
              assert.strictEqual(typeof field.gatewayCodec.decode, 'function');
              assert.strictEqual(typeof field.edgeCodec.write, 'function');
              assert.strictEqual(typeof field.edgeCodec.read, 'function');
            });
          });
        });
      });
    });
  });
});