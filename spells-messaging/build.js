var fs = require('fs');

module.exports = function () {
  return function () {
    fs.readdirSync(__dirname + '/protocol').forEach(function (fileName) {
      var protocol = require(__dirname + '/protocol/' + fileName);
      protocol = protocol();
      if (!protocol) {
        return;
      }
      var name = fileName.slice(0, fileName.length - 3);

      var dir = __dirname + '/build/' + name;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      var ioGenerator = require('./lib/ioGenerator')();
      var headerWriter = require('./lib/codeWriter')();
      var sourceWriter = require('./lib/codeWriter')();
      var edgeGenerator = require('./lib/edgeGenerator')();

      var protoHeader = fs.readFileSync(__dirname + '/templates/proto.h', 'utf-8');
      var postHeader = fs.readFileSync(__dirname + '/templates/post.h', 'utf-8');
      var protoSource = fs.readFileSync(__dirname + '/templates/proto.cpp', 'utf-8');

      edgeGenerator.generateHeader(protocol, headerWriter, ioGenerator, protoHeader, postHeader);
      edgeGenerator.generateSource(protocol, sourceWriter, ioGenerator, protoSource);

      var header = headerWriter.render();
      var source = sourceWriter.render();
      
      fs.writeFileSync(dir + '/' + name + '.h', header, { flag: 'w' });
      fs.writeFileSync(dir + '/' + name + '.cpp', source, { flag: 'w' });
    });
  };
};