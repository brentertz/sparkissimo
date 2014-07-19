/** @jsx React.DOM */

var $ = require('jquery');
var io = require('socket.io-client');
var React = window.React = require('react');
var Ocupado = require('./app/components/ocupado');

$(function() {
  var socket = io.connect('/');

  React.renderComponent(
    <Ocupado socket={ socket } />,
    document.getElementById('content')
  );
});
