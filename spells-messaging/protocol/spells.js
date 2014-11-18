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
        ]
      },
      {
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
        name: 'status',
        fields: [
          {
            name: 'position',
            type: 'integer',
            min: 0,
            max: 1000
          }
        ]
      }
    ]
  };
  var door = {
    name: 'door',
    methods: [
      {
        name: 'status',
        fields: [
          {
            name: 'position',
            type: 'integer',
            min: 0,
            max: 1000
          }
        ]
      }
    ]
  };
  var airConditioner = {
    name: 'airConditioner',
    methods: [
      {
        name: 'status',
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
  var doorLock = {
    name: 'doorLock',
    methods: [
      {
        name: 'status',
        fields: [
          {
            name: 'open',
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
        name: 'status',
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

  protocol.features.push(light);
  protocol.features.push(doorLock);
  protocol.features.push(airConditioner);
  protocol.features.push(door);
  protocol.features.push(window);
  protocol.features.push(atmosphere);

  return protocol;
};
