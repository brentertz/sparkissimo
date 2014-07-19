/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');

var Ocupado = React.createClass({
  getInitialState: function() {
    return { status: '' };
  },

  checkStatus: function() {
    this.props.socket.emit('status');
  },

  onMessage: function(status) {
    this.setState({ status: status });
  },

  onError: function(error) {
    this.setState({ status: 'error' });
    console.log(error);
  },

  componentDidMount: function() {
    this.props.socket.on('status', this.onMessage);
    this.props.socket.on('connect_error', this.onError);
    this.props.socket.on('reconnect', this.checkStatus);
    this.props.socket.on('reconnect_failed', this.onError);
    this.checkStatus();
  },

  render: function() {
    var statusClassName = 'status ' + this.state.status;
    return (
      <div className="ocupado">
        <div className={ statusClassName }>{ this.state.status }</div>
      </div>
    );
  }
});

module.exports = Ocupado;
