module.exports = function () {
  var protocol = {
    name: 'spells',
    features: []
  };

  var deviceId = {
    name: 'deviceId',
    methods: [
      {
        name: 'clear',
        fields: []
      },
      {
        name: 'deviceId',
        fields: [
          {
            name: 'a',
            type: 'integer',
            min: 0,
            max: 4294967295
          },
          {
            name: 'b',
            type: 'integer',
            min: 0,
            max: 4294967295
          },
          {
            name: 'c',
            type: 'integer',
            min: 0,
            max: 4294967295
          },
          {
            name: 'd',
            type: 'integer',
            min: 0,
            max: 4294967295
          }
        ]
      }
    ]
  };

  var userId = {
    name: 'userId',
    methods: [
      {
        name: 'userId',
        fields: [
          {
            name: 'id',
            type: 'integer',
            min: 0,
            max: 4294967295
          }
        ]
      }
    ]
  };

  protocol.features.push(deviceId);
  protocol.features.push(userId);

  var air = {
    name: 'air',
    methods: [
      {
        name: 'requestTemperature',
        fields: []
      },
      {
        name: 'temperature',
        fields: [
          {
            name: 'temperature',
            type: 'integer',
            min: -20,
            max: 100
          }
        ]
      },
      {
        name: 'requestDust',
        fields: []
      },
      {
        name: 'dust',
        fields: [
          {
            name: 'dust',
            type: 'integer',
            min: 0,
            max: 10000
          }
        ]
      },
      {
        name: 'requestCarbonDioxide',
        fields: []
      },
      {
        name: 'carbonDioxide',
        fields: [
          {
            name: 'carbonDioxide',
            type: 'integer',
            min: 450,
            max: 2000
          }
        ]
      },
      {
        name: 'requestHumidity',
        fields: []
      },
      {
        name: 'humidity',
        fields: [
          {
            name: 'humidity',
            type: 'integer',
            min: 0,
            max: 100
          }
        ]
      }
    ]
  };
  var window = {
    name: 'window',
    methods: [
      {
        name: 'requestTarget',
        fields: []
      },
      {
        name: 'target',
        fields: [
          {
            name: 'position',
            type: 'integer',
            min: 0,
            max: 100
          }
        ]
      },
      {
        name: 'requestStatus',
        fields: []
      },
      {
        name: 'status',
        fields: [
          {
            name: 'position',
            type: 'integer',
            min: 0,
            max: 100
          }
        ]
      }
    ]
  };
  var door = {
    name: 'door',
    methods: [
      {
        name: 'requestStatus',
        fields: []
      },
      {
        name: 'status',
        fields: [
          {
            name: 'isOpen',
            type: 'integer',
            min: 0,
            max: 1
          }
        ]
      }
    ]
  };
  var airConditioner = {
    name: 'airConditioner',
    methods: [
      {
        name: 'requestStatus',
        fields: []
      },
      {
        name: 'status',
        fields: [
          {
            name: 'isOn',
            type: 'integer',
            min: 0,
            max: 1
          }
        ]
      }
    ]
  };
  var doorLock = {
    name: 'doorLock',
    methods: [
      {
        name: 'requestStatus',
        fields: []
      },
      {
        name: 'status',
        fields: [
          {
            name: 'isOpen',
            type: 'integer',
            min: 0,
            max: 1
          }
        ]
      }
    ]
  };

  var light = {
    name: 'light',
    methods: [
      {
        name: 'requestStatus',
        fields: []
      },
      {
        name: 'status',
        fields: [
          {
            name: 'isOn',
            type: 'integer',
            min: 0,
            max: 1
          }
        ]
      }
    ]
  };

  protocol.features.push(light);
  protocol.features.push(doorLock);
  protocol.features.push(airConditioner);
  protocol.features.push(door);
  protocol.features.push(window);
  protocol.features.push(air);

  return protocol;
};
