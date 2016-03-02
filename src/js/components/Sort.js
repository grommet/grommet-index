// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import AscIcon from 'grommet/components/icons/base/LinkDown';
import DescIcon from 'grommet/components/icons/base/LinkUp';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = "index-sort";

export default class Sort extends Component {

  constructor (props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onChangeDirection = this._onChangeDirection.bind(this);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _stateFromProps (props) {
    const parts = props.value.split(':');
    return {
      name: parts[0],
      direction: parts[1]
    };
  }

  _onChange (event) {
    const value = event.target.value;
    this.props.onChange(value + ':' + this.state.direction);
  }

  _onChangeDirection (direction) {
    this.props.onChange(this.state.name + ':' + direction);
  }

  render () {
    const { attributes } = this.props;
    var other = pick(this.props, keys(Box.propTypes));
    let classNames = [CLASS_ROOT];
    if (this.props.className) {
      classNames.push(this.props.className);
    }

    const options = attributes
      .map(attribute => {
        return (
          <option key={attribute.name} value={attribute.name}>
            {attribute.label || attribute.name}
          </option>
        );
      });

    let title = Intl.getMessage(this.context.intl, 'Sort');

    return (
      <Box {...other} className={classNames.join(' ')}>
        <Header size="small">{title}</Header>
        <Box direction="row" justify="between" align="center">
          <select ref="sort" value={this.state.name} className="flex"
            onChange={this._onChange}>
            {options}
          </select>
          <span>
            <Button
              icon={<AscIcon colorIndex={'asc' === this.state.direction ? 'brand' : undefined} />}
              onClick={this._onChangeDirection.bind(this, 'asc')} />
            <Button
              icon={<DescIcon colorIndex={'desc' === this.state.direction ? 'brand' : undefined} />}
              onClick={this._onChangeDirection.bind(this, 'desc')} />
          </span>
        </Box>
      </Box>
    );
  }
}

Sort.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func, // name:asc|desc
  value: PropTypes.string // name:asc|desc
};

Sort.defaultProps = {
  value: ''
};

Sort.contextTypes = {
  intl: PropTypes.object
};
