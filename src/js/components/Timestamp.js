// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = 'timestamp';

export default class Timestamp extends Component {

  render () {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + '--' + this.props.align);
    if (this.props.className) {
      classes.push(this.props.className);
    }
    let locale;
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = this.props.value.toLocaleDateString(locale, dateOptions);
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const time = this.props.value.toLocaleTimeString(locale, timeOptions);
    return (
      <span className={classes.join(' ')}>
        <span className={CLASS_ROOT + '__date'}>{date}
        </span> <span className={CLASS_ROOT + '__time'}>{time}</span>
      </span>
    );
  }

}

Timestamp.propTypes = {
  align: PropTypes.oneOf['left', 'right'],
  value: PropTypes.object.isRequired
};

Timestamp.defaultProps = {
  align: 'left'
};
