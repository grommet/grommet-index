// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from 'grommet/components/Notification';

const CLASS_ROOT = 'resource-notifications';

export default class Notifications extends Component {

  render () {
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

}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object)
};
