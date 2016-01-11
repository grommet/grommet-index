// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Meter from 'grommet/components/Meter';
import Distribution from 'grommet/components/Distribution';
import IndexQuery from '../utils/Query';

const STATUS_IMPORTANCE = {
  'error': 1,
  'critical': 1,
  'warning': 2,
  'ok': 3,
  'disabled': 4,
  'unknown': 5
};

export default class Aggregate extends Component {

  constructor (props) {
    super(props);

    this._onClick = this._onClick.bind(this);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _onClick (value) {
    var query;
    if (this.props.query) {
      query = this.props.query.clone();
    } else {
      query = IndexQuery.create();
    }
    query.replaceAttributeValues(this.props.attribute, [value]);
    this.props.onClick(query);
  }

  _stateFromProps (props) {
    var series = (props.series || []).map(function(item, index) {
      var colorIndex = 'graph-' + (index + 1);
      if ('status' === props.attribute) {
        colorIndex = item.value.toLowerCase();
      }
      return {
        label: item.label || item.value,
        value: item.count,
        colorIndex: colorIndex,
        onClick: this._onClick.bind(this, item.value),
        important: false
      };
    }, this);

    if ('status' === props.attribute && series.length > 0) {
      // re-order by importance
      series.sort(function (s1, s2) {
        return (STATUS_IMPORTANCE[s2.label.toLowerCase()] -
          STATUS_IMPORTANCE[s1.label.toLowerCase()]);
      });
      // mark most severe as most important
      series[series.length - 1].important = true;
    }

    return { series: series };
  }

  render () {
    var component;
    if ('distribution' === this.props.type) {
      component = (
        <Distribution series={this.state.series || []}
          legend={true}
          legendTotal={true}
          size={this.props.size} />
      );
    } else {
      component = (
        <Meter series={this.state.series || []}
          legend={this.props.legend}
          size={this.props.size}
          type={this.props.type}
          threshold={this.props.threshold}
          a11yTitleId={this.props.a11yTitleId}
          a11yDescId={this.props.a11yTitleId} />
      );
    }

    return component;
  }

}

Aggregate.propTypes = {
  a11yTitleId: PropTypes.string,
  a11yDescId: PropTypes.string,
  attribute: PropTypes.string.isRequired,
  legend: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      total: PropTypes.bool,
      placement: PropTypes.oneOf(['right', 'bottom'])
    })
  ]),
  onClick: PropTypes.func,
  query: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  })),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  threshold: PropTypes.number,
  type: PropTypes.oneOf(['bar', 'arc', 'circle', 'distribution'])
};
