var _ = require('lodash');
var async = require('async');
var nodeHueApi = require('node-hue-api');
var HueApi = nodeHueApi.HueApi;
var lightState = nodeHueApi.lightState;

module.exports = function(config, callback) {
  var bridge;
  var hue = {
    api: null,

    ocupado: function() {
      var state = lightState.create().effect('none').rgb(255,0,0).brightness(100).on();
      setLightState(state);
    },

    desocupado: function() {
      var state = lightState.create().effect('none').rgb(0,255,0).brightness(100).on();
      setLightState(state);
    }
  };

  var setLightState = function(state) {
    hue.api.lights(function(err, lights) {
      if (err) { console.log('No Hue lights found!'); }
      _.forEach(lights.lights, function(light) {
        this.setLightState(light.id, state);
      }, hue.api);
    });
  };

  async.series([
    function(callback) {
      nodeHueApi.locateBridges(function(err, bridges) {
        bridge = bridges[0];
        hue.api = new HueApi(bridge.ipaddress, config.hue.username);
        callback(err);
      });
    },
    function(callback) {
      // Attempt API call using supplied username and register a user if needed
      hue.api.pressLinkButton(function(err) {
        if (err) {
          hue.api.registerUser(bridge.ipaddress, config.hue.username, null, function(err, user) {
            config.hue.username = hue.api.username = user;
            callback(err);
          });
        } else {
          callback(null);
        }
      });
    }
  ], function(err, results) {
    if (err) { throw new Error(err); }
    console.log('Hue connected successfully');

    callback && callback(err, hue);
  });
};
