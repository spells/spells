module.exports = function () {
  var protocol = {
    name: 'test'
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

  var knob = {
    name: 'knob',
    methods: [
      {
        name: 'value',
        fields: [
          {
            name: 'id',
            type: 'integer',
            min: -50000,
            max: 50000
          }
        ]
      }
    ]
  };
  protocol.features = [];
  protocol.features.push(deviceId);
  protocol.features.push(userId);
  protocol.features.push(knob);
  return protocol;
};
