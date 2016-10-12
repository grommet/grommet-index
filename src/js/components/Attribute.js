// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import StatusIcon from 'grommet/components/icons/Status';
import Timestamp from 'grommet/components/Timestamp';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = "index-attribute";

export default class Attribute extends Component {

  render () {
    const { attribute, item } = this.props;

    let classes = [CLASS_ROOT];
    if (attribute.secondary) {
      classes.push(`${CLASS_ROOT}--secondary`);
    }
    if (attribute.size) {
      classes.push(`${CLASS_ROOT}--${attribute.size}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let content = <span>'?'</span>;
    let value;

    if (attribute.hasOwnProperty('render')) {

      content = attribute.render(item);
      if (typeof content === 'string') {
        content = <span className={classes.join(' ')}>{content}</span>;
      }

    } else {

      if (item.hasOwnProperty(attribute.name)) {
        value = item[attribute.name];
      } else if (item.attributes &&
        item.attributes.hasOwnProperty(attribute.name)) {
        value = item.attributes[attribute.name];
      }

      if ('status' === attribute.name) {
        content = (
          <StatusIcon className={classes.join(' ')}
            value={value.toLowerCase()} size="small" />
        );
      } else if (attribute.timestamp) {
        classes.push(`${CLASS_ROOT}__timestamp`);
        content = (
          <Timestamp className={classes.join(' ')} value={value} />
        );
      } else {
        content = <span className={classes.join(' ')}>{value}</span>;
      }
    }

    return content;
  }

}

Attribute.propTypes = {
  item: PropTypes.object.isRequired,
  attribute: IndexPropTypes.attribute.isRequired
};
