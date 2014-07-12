/** @jsx React.DOM */

var $ = require('jquery');
var io = require('socket.io-client');
var React = window.React = require('react');
var LedToggle = require('./app/components/led-toggle');

$(function() {
  var socket = io.connect('/');

  React.renderComponent(
    <LedToggle socket={ socket } />,
    document.getElementById('content')
  );
});
