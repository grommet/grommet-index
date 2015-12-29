// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _grommetComponentsChart = require('grommet/components/Chart');

var _grommetComponentsChart2 = _interopRequireDefault(_grommetComponentsChart);

var IndexHistory = (function (_Component) {
  _inherits(IndexHistory, _Component);

  function IndexHistory(props) {
    _classCallCheck(this, IndexHistory);

    _get(Object.getPrototypeOf(IndexHistory.prototype), 'constructor', this).call(this, props);

    this.state = this._stateFromProps(props);
  }

  _createClass(IndexHistory, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this._stateFromProps(nextProps));
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var xAxis = [];
      if (props.series) {
        var series = props.series.map(function (item, index) {
          var values = item.intervals.map(function (interval) {
            var date = new Date(Date.parse(interval.start));
            if (0 === index) {
              xAxis.push({
                label: date.getMonth() + 1 + '/' + date.getDate(),
                value: date
              });
            }
            return [date, interval.count];
          });

          var colorIndex = 'graph-' + (index + 1);
          if ('status' === props.attribute) {
            colorIndex = interval.value.toLowerCase();
          }
          return { label: item.value, values: values, colorIndex: colorIndex };
        });
      }
      return { series: series, xAxis: xAxis };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(_grommetComponentsChart2['default'], { series: this.state.series || [],
        xAxis: this.state.xAxis || [],
        legend: { position: 'overlay' },
        legendTotal: true,
        size: this.props.size,
        smooth: this.props.smooth,
        points: this.props.points,
        type: this.props.type,
        threshold: this.props.threshold });
    }
  }]);

  return IndexHistory;
})(_react.Component);

exports['default'] = IndexHistory;

IndexHistory.propTypes = {
  attribute: _react.PropTypes.string.isRequired,
  points: _react.PropTypes.bool,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.string.isRequired,
    intervals: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      count: _react.PropTypes.number,
      start: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
      stop: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
    })).isRequired
  })),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  smooth: _react.PropTypes.bool,
  threshold: _react.PropTypes.number,
  type: _react.PropTypes.oneOf(['bar', 'area', 'line'])
};
module.exports = exports['default'];