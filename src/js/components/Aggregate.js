// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Legend from 'grommet/components/Legend';
import Distribution from 'grommet/components/Distribution';

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

  _stateFromProps (props) {
    // convert the format Meter and Distribution want
    let series = props.values.map((item, index) => {
      let colorIndex = `graph-${index + 1}`;
      if ('status' === props.name) {
        colorIndex = item.value.toLowerCase();
      }
      return {
        label: item.label || item.value,
        value: item.count,
        colorIndex: colorIndex,
        onClick: this._onClick.bind(this, item.value),
        important: false
      };
    });

    if ('status' === props.name && series.length > 0) {
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

  _onClick (value) {
    let filters = { ...this.props.filters };
    filters[this.props.name] = value;
    this.props.onClick(filters);
  }

  render () {
    let result;
    if ('distribution' === this.props.type) {
      result = (
        <Distribution series={this.state.series}
          legend={true}
          legendTotal={true}
          size={this.props.size} />
      );
    } else {
      result = (
        <Box direction="row" align="center" pad={{ between: 'medium' }}>
          <Meter series={this.state.series}
            legend={this.props.legend}
            size={this.props.size}
            stacked={this.props.stacked}
            type={this.props.type}
            threshold={this.props.threshold}
            a11yTitle={this.props.a11yTitle} />
          <Legend series={this.state.series} />
        </Box>
      );
    }

    return result;
  }

}

Aggregate.propTypes = {
  a11yTitle: PropTypes.string,
  filters: PropTypes.object, // { name: [value, ...] }
  legend: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      total: PropTypes.bool,
      placement: PropTypes.oneOf(['right', 'bottom'])
    })
  ]),
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func, // (filters)
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  stacked: PropTypes.bool,
  threshold: PropTypes.number,
  type: PropTypes.oneOf(['bar', 'arc', 'circle', 'distribution']),
  values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }))
};

Aggregate.defaultProps = {
  values: []
};
