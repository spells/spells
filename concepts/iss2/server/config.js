var crypto = require('crypto');

module.exports = {
  title: 'Spells',

  persistence: {},

  password: 'spells',

  host: '0.0.0.0',
  port: 49766,

  sessionKey: 'SpellsServerSession',
  sessionSecret: 'SpellsServerSession' + crypto.randomBytes(4).toString('hex')
};