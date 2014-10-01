module.exports = function (app, riccardo) {
  var fs = require('fs');
  var _ = require('lodash');
  var express = require('express');
  var router = express.Router();

  // 제외 목록
  var ex = [
    'index.js',
    'api',
    'accessControl.js',
    '.DS_Store'
  ];
  fs.readdirSync(__dirname).forEach(function (file) {
    if (!_.contains(ex, file)) {
      var name = file.substr(0, file.indexOf('.'));
      var controller = riccardo.$(require('./' + name))(router);
    }
  });

  // API에 속하지 않는 controllers
  app.use('/', router);

  // API를 구성하는 controllers
  riccardo.$(require('./api'))();
};