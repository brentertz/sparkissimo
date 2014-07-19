var j5 = require('johnny-five');
var Spark = require('spark-io');

module.exports = function(sio, hue, config) {
  var led, reedSwitch;
  var board = new j5.Board({
    io: new Spark({
      token: config.spark.apiToken,
      deviceId: config.spark.deviceId
    })
  });

  var emitStatus = function(socket) {
    socket = socket || sio.sockets; // default to broadcast
    var status = reedSwitch.isClosed ? 'ocupado' : 'desocupado'; // TODO: if board is not ready, send ''
    socket.emit('status', status);
  };

  board.on('ready', function() {
    led = new j5.Led('D7');
    reedSwitch = new j5.Switch('D0');

    this.repl.inject({
      board: board,
      led: led,
      reedSwitch: reedSwitch
    });

    reedSwitch.on('open', function() {
      led.on();
      hue.desocupado();
      emitStatus();
    });

    reedSwitch.on('close', function() {
      led.off();
      hue.ocupado();
      emitStatus();
    });

    setTimeout(function() {
      led.off(); // NOTE: Not sure why, but this is needed to activate board
    }, 100);
  });

  sio.sockets.on('connection', function(socket) {
    socket.on('status', function() {
      emitStatus(socket);
    });
  });
};
