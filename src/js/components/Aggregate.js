// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Meter = require('grommet/components/Meter');
var Distribution = require('grommet/components/Distribution');
var Query = require('../utils/Query');

var STATUS_IMPORTANCE = {
  'error': 1,
  'critical': 1,
  'warning': 2,
  'ok': 3,
  'disabled': 4,
  'unknown': 5
};

var Aggregate = React.createClass({

  propTypes: {
    attribute: React.PropTypes.string.isRequired,
    legend: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.shape({
        total: React.PropTypes.bool,
        placement: React.PropTypes.oneOf(['right', 'bottom'])
      })
    ]),
    onClick: React.PropTypes.func,
    query: React.PropTypes.object,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string.isRequired,
      count: React.PropTypes.number.isRequired
    })),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['bar', 'arc', 'circle', 'distribution'])
  },

  getInitialState: function () {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  _onClick: function (value) {
    var query;
    if (this.props.query) {
      query = this.props.query.clone();
    } else {
      query = Query.create();
    }
    query.replaceAttributeValues(this.props.attribute, [value]);
    this.props.onClick(query);
  },

  _stateFromProps: function (props) {
    var series = (props.series || []).map(function(item, index) {
      var colorIndex = 'graph-' + (index + 1);
      if ('status' === props.attribute) {
        colorIndex = item.value.toLowerCase();
      }
      return {
        label: item.label || item.value,
        value: item.count,
        colorIndex: colorIndex,
        onClick: this._onClick.bind(this, item.count),
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
  },

  render: function () {
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
          threshold={this.props.threshold} />
      );
    }

    return component;
  }

});

module.exports = Aggregate;
