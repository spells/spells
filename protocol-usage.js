var protocol = {/* 프로토콜 정의 */};
var server = require('spells-messaging-server')(protocol);

server.connect(function (deviceId, featureId) {
  // 연결되었을 때
});
server.disconnect(function (deviceId, featureId) {
  // 연결 끊겼을 때
});

       // 기능 이름
           // 메소드
                     // 콜백이 들어가면 recv 콜백 등록
server.led.ledStatus(function (deviceId, data) {
  var id = data.id;
  var status = data.status;
});

var deviceId = 1;
var data = {/* 어떤 데이터 */};
// Q
server.led.ledStatus(deviceId, data).then(function () {
  // success
}, function () {
  // error
});

server.listen(function () {

});