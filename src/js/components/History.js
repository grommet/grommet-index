// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Chart from 'grommet/components/Chart';

export default class IndexHistory extends Component {

  constructor (props) {
    super(props);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _stateFromProps (props) {
    var xAxis = [];
    if (props.series) {
      var series = props.series.map(function (item, index) {
        var values = item.intervals.map(function (interval) {
          var date = new Date(Date.parse(interval.start));
          if (0 === index) {
            xAxis.push({
              label: (date.getMonth() + 1) + '/' + date.getDate(),
              value: date
            });
          }
          return [date, interval.count];
        });

        var colorIndex = 'graph-' + (index + 1);
        if ('status' === props.attribute) {
          colorIndex = interval.value.toLowerCase();
        }
        return {label: item.value, values: values, colorIndex: colorIndex};
      });
    }
    return { series: series, xAxis: xAxis };
  }

  render () {
    return (
      <Chart series={this.state.series || []}
        xAxis={this.state.xAxis || []}
        legend={{position: 'overlay'}}
        legendTotal={true}
        size={this.props.size}
        smooth={this.props.smooth}
        points={this.props.points}
        type={this.props.type}
        threshold={this.props.threshold} />
    );
  }

}

IndexHistory.propTypes = {
  attribute: PropTypes.string.isRequired,
  points: PropTypes.bool,
  series: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    intervals: PropTypes.arrayOf(PropTypes.shape({
      count: PropTypes.number,
      start: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
      ]),
      stop: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
      ])
    })).isRequired
  })),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  smooth: PropTypes.bool,
  threshold: PropTypes.number,
  type: PropTypes.oneOf(['bar', 'area', 'line'])
};
