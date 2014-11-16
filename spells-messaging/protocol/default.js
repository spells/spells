module.exports = function () {
  return null;
  /*
  var protocol = {
    // 프로토콜 이름(미래에 사용할 예정)
    name: 'spells-protocol',
    // 프로토콜 버전(미래에 사용할 예정)
    version: '0.1.0'
  };

  return protocol;*/
/*
  // 장치: device
  // 기능: feature
  // 송수신 형식 정의: method
  // method가 전달되는 인스턴스: message
  // 현재 type은 integer만 지원

  // var protocol = require('protocol.js')();
  // 위와 같이 사용할 수 있어야 합니다.
  // 뒤쪽의 함수 호출에 유의합니다. 의존성 주입을 지원하기 위함입니다.

  var atmosphere = {
    name: 'atmosphere',
    methods: [
      {
        name: 'temperature',
        fields: [
          {
            name: 'temperature',
            type: 'integer',
            min: -100,
            max: 100
          }
        ],
        name: 'particles',
        fields: [
          {
            name: 'particles',
            type: 'integer',
            min: 0,
            max: 1000
          }
        ]
      }
    ]
  };

  var window = {
    name: 'window',
    methods: [
      {
        name: 'move',
        fields: [
          name: 'open',
          min: 0,
          max: 1
        ]
      },
      {
        name: 'status',
        fields: [
          name: 'open',
          min: 0,
          max: 1000
        ]
      }
    ]
  };

  var door = {
    name: 'door',
    methods: window.methods
  };

  var airConditioner = {
    name: 'airConditioner',
    methods: [
      {
        name: 'status',
        fields: [
          name: 'on',
          min: 0,
          max: 1
        ]
      }
    ]
  };

  var doorLock = {
    name: 'doorLock',
    methods: [
      {
        name: 'doorOpenClose',
        fields: [
          {
            name: 'isOpen'
          }
        ]
      }
    ]
  };

  var light = {
    name: 'light',
    methods: [
      {
        name: 'on',
        fields: [
          {
            name: 'on',
            type: 'integer',
            min: 0,
            max: 1
          }
        ]
      }
    ]
  };

  protocol.features = [];

  protocol.push(light);
  protocol.push(doorLock);
  protocol.push(airConditioner);
  protocol.push(door);
  protocol.push(window);
  protocol.push(atmosphere);

  return protocol;

  var led = {
    // 기능 이름
    name: 'led',
    // 기능의 송수신 형식 (양방향)
    methods: [
      {
        // method 이름
        name: 'ledToggle',
        // method의 세부 필드 목록
        fields: [
          {
            // 파라메터명
            name: 'id',
            // 파라메터 타입은 현재 정수만 지원
            type: 'integer',
            // 최솟값 (이 값 포함하는 닫힌 구간)
            min: '0',
            // 최댓값 (이 값 포함하는 닫힌 구간)
            max: '15'
          }
        ]
      },
      {
        name: 'ledStatus',
        fields: [
          {
            name: 'id',
            type: 'integer',
            min: '0',
            max: '15'
          },
          {
            name: 'status',
            type: 'integer',
            min: '0',
            max: '1'
          }
        ]
      }
    ]
  };
  protocol.features.push(led);
  var dial = {
    name: 'dial',
    methods: [
      {
        name: 'dialStatus',
        fields: [
          {
            name: 'value',
            type: 'intger',
            min: '0',
            max: '2000'
          }
        ]
      }
    ]
  };
  protocol.features.push(dial);

  return protocol;*/
};
