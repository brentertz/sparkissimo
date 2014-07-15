module.exports = function(app, sio, config) {
  require('./spark')(sio, config);
};
