'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Chart = require('grommet/components/chart/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Legend = require('grommet/components/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var TYPES = {
  'area': _Chart.Area,
  'bar': _Chart.Bar,
  'line': _Chart.Line
};

var IndexHistory = function (_Component) {
  (0, _inherits3.default)(IndexHistory, _Component);

  function IndexHistory(props) {
    (0, _classCallCheck3.default)(this, IndexHistory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndexHistory.__proto__ || (0, _getPrototypeOf2.default)(IndexHistory)).call(this, props));

    _this.state = _this._stateFromProps(props);
    return _this;
  }

  (0, _createClass3.default)(IndexHistory, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this._stateFromProps(nextProps));
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var series = [];
      var values = [];
      var xAxis = [];
      var max = void 0;
      if (props.series) {
        series = props.series.map(function (item, index) {
          values = item.intervals.map(function (interval) {
            var date = interval.start;
            if (typeof interval.start === 'string') {
              date = new Date(Date.parse(interval.start));
            }
            if (0 === index) {
              xAxis.push({
                label: date.getMonth() + 1 + '/' + date.getDate(),
                value: date
              });
            }
            max = Math.max(max, interval.count);
            return interval.count;
          });

          var colorIndex = 'graph-' + (index + 1);
          if ('status' === props.name) {
            colorIndex = item.value.toLowerCase();
          }
          return {
            label: item.label || item.value,
            values: values[values.length - 1],
            colorIndex: colorIndex
          };
        });
      }
      return { max: max, series: series, values: values, xAxis: xAxis };
    }
  }, {
    key: 'render',
    value: function render() {
      var Visual = TYPES[this.props.type];
      // TODO: Marker for this.props.threshold
      return _react2.default.createElement(
        _Box2.default,
        null,
        _react2.default.createElement(
          _Chart2.default,
          null,
          _react2.default.createElement(_Chart.Base, { height: this.props.size }),
          _react2.default.createElement(
            _Chart.Layers,
            null,
            _react2.default.createElement(Visual, { values: this.state.values, max: this.state.max,
              smooth: this.props.smooth, points: this.props.points })
          ),
          _react2.default.createElement(_Chart.Axis, { count: this.state.xAxis.length })
        ),
        _react2.default.createElement(_Legend2.default, { series: this.state.series, total: true })
      );
    }
  }]);
  return IndexHistory;
}(_react.Component);

exports.default = IndexHistory;


IndexHistory.propTypes = {
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  legend: _react.PropTypes.shape({
    position: _react.PropTypes.oneOf(['overlay', 'after']),
    total: _react.PropTypes.bool
  }),
  name: _react.PropTypes.string.isRequired,
  points: _react.PropTypes.bool,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
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

IndexHistory.defaultProps = {
  legend: { position: 'after' }
};
module.exports = exports['default'];