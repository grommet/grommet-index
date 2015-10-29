// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Notification = require('grommet/components/Notification');

var CLASS_ROOT = 'resource-notifications';

var Notifications = React.createClass({

  propTypes: {
    notifications: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var notifications;
    if (this.props.notifications) {
      notifications = this.state.notifications.map(function (notification) {
        return (
          <Notification key={notification.uri} flush={false}
            status={notification.status}
            message={notification.name}
            state={notification.state}
            timestamp={new Date(notification.created)} />
        );
      }, this);
    }

    return (
      <div className={classes.join(' ')}>
        {notifications}
      </div>
    );
  }

});

module.exports = Notifications;
