/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');

var LedToggle = React.createClass({
  getInitialState: function() {
    return { status: '' };
  },

  onMessage: function(status) {
    this.setState({ status: status });
  },

  handleClick: function() {
    this.props.socket.emit('led:toggle');
  },

  componentWillMount: function() {
    this.props.socket.on('led:status', this.onMessage);
  },

  render: function() {
    var statusClassName = 'status ' + this.state.status;
    return (
      <div className="led-toggle" onClick={ this.handleClick }>
        <div className={ statusClassName }>{ this.state.status }</div>
      </div>
    );
  }
});

module.exports = LedToggle;
