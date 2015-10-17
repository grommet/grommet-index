// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chart = require('grommet/components/Chart');

var IndexHistory = React.createClass({

  propTypes: {
    attribute: React.PropTypes.string.isRequired,
    points: React.PropTypes.bool,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      intervals: React.PropTypes.arrayOf(React.PropTypes.shape({
        count: React.PropTypes.number,
        start: React.PropTypes.oneOfType([
          React.PropTypes.object,
          React.PropTypes.string
        ]),
        stop: React.PropTypes.oneOfType([
          React.PropTypes.object,
          React.PropTypes.string
        ])
      })).isRequired
    })),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    smooth: React.PropTypes.bool,
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['bar', 'area', 'line'])
  },

  getInitialState: function () {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  },

  _stateFromProps: function (props) {
    var xAxis = [];
    if (this.props.series) {
      var series = this.props.series.map(function (item, index) {
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
        if ('status' === this.props.attribute) {
          colorIndex = interval.value.toLowerCase();
        }
        return {label: item.value, values: values, colorIndex: colorIndex};
      }, this);
    }
    return { series: series, xAxis: xAxis };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  },

  render: function () {
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

});

module.exports = IndexHistory;
