'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('grommet/components/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var IndexHistory = function (_Component) {
  _inherits(IndexHistory, _Component);

  function IndexHistory(props) {
    _classCallCheck(this, IndexHistory);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexHistory).call(this, props));

    _this.state = _this._stateFromProps(props);
    return _this;
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
      return _react2.default.createElement(_Chart2.default, { series: this.state.series || [],
        xAxis: this.state.xAxis || [],
        legend: { position: 'overlay' },
        legendTotal: true,
        size: this.props.size,
        smooth: this.props.smooth,
        points: this.props.points,
        type: this.props.type,
        threshold: this.props.threshold,
        a11yTitleId: this.props.a11yTitleId,
        a11yDescId: this.props.a11yTitleId });
    }
  }]);

  return IndexHistory;
}(_react.Component);

exports.default = IndexHistory;

IndexHistory.propTypes = {
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
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