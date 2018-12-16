// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Chart, { Area, Axis, Bar, Base, Layers, Line } from
  'grommet/components/chart/Chart';
import Legend from 'grommet/components/Legend';

const TYPES = {
  'area': Area,
  'bar': Bar,
  'line': Line
};

export default class IndexHistory extends Component {

  constructor (props) {
    super(props);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _stateFromProps (props) {
    let series = [];
    let values = [];
    let xAxis = [];
    let max;
    if (props.series) {
      series = props.series.map((item, index) => {
        values = item.intervals.map(interval => {
          let date = interval.start;
          if (typeof interval.start === 'string') {
            date = new Date(Date.parse(interval.start));
          }
          if (0 === index) {
            xAxis.push({
              label: (date.getMonth() + 1) + '/' + date.getDate(),
              value: date
            });
          }
          max = Math.max(max, interval.count);
          return interval.count;
        });

        let colorIndex = `graph-${index + 1}`;
        if ('status' === props.name) {
          colorIndex = item.value.toLowerCase();
        }
        return {
          label: (item.label || item.value),
          values: values[values.length - 1],
          colorIndex: colorIndex
        };
      });
    }
    return { max, series, values, xAxis };
  }

  render () {
    const Visual = TYPES[this.props.type];
    // TODO: Marker for this.props.threshold
    return (
      <Box>
        <Chart>
          <Base height={this.props.size} />
          <Layers>
            <Visual values={this.state.values} max={this.state.max}
              smooth={this.props.smooth} points={this.props.points} />
          </Layers>
          <Axis count={this.state.xAxis.length} />
        </Chart>
        <Legend series={this.state.series} total={true} />
      </Box>
    );
  }

}

IndexHistory.propTypes = {
  a11yTitleId: PropTypes.string,
  a11yDescId: PropTypes.string,
  legend: PropTypes.shape({
    position: PropTypes.oneOf(['overlay', 'after']),
    total: PropTypes.bool
  }),
  name: PropTypes.string.isRequired,
  points: PropTypes.bool,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
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

IndexHistory.defaultProps = {
  legend: {position: 'after'}
};
