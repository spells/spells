module.exports = function (riccardo) {

  var fs = require('fs');
  var _ = require('lodash');

  // 제외 목록
  var ex = [
    'index.js',
    'sql',
    '.DS_Store'
  ];

  fs.readdirSync(__dirname).forEach(function (file) {
    if (_.contains(ex, file)) {
      return;
    }
    var name = file.substr(0, file.indexOf('.'));
    var service = riccardo.$(require('./' + name))();
    riccardo.set(name + 'Service', service);
  });
};
