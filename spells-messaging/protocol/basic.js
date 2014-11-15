module.exports = function () {
  var protocol = {
    name: 'basic'
  };

  var light = {
    name: 'light',
    methods: [
      {
        name: 'onoff',
        fields: [
          {
            name: 'id',
            type: 'integer',
            min: -10,
            max: 10
          }
        ]
      }
    ]
  };
  protocol.features = [];
  protocol.features.push(light);
  return protocol;
};
