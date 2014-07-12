var j5 = require('johnny-five');
var Spark = require('spark-io');

module.exports = function(sio, config) {
  var board = new j5.Board({
    io: new Spark({
      token: config.spark.apiToken,
      deviceId: config.spark.deviceId
    })
  });
  var led;

  board.on('ready', function() {
    led = new j5.Led('D7');
    this.ready = true;
  });

  sio.sockets.on('connection', function(socket) {
    if (board.ready) {
      socket.emit('led:status', led.isOn ? 'on' : 'off');

      socket.on('led:toggle', function() {
        led.toggle();
        sio.sockets.emit('led:status', led.isOn ? 'on' : 'off');
      });
    }
  });
};
