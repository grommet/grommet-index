'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Meter = require('grommet/components/Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Distribution = require('grommet/components/Distribution');

var _Distribution2 = _interopRequireDefault(_Distribution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_IMPORTANCE = {
  'error': 1,
  'critical': 1,
  'warning': 2,
  'ok': 3,
  'disabled': 4,
  'unknown': 5
}; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Aggregate = function (_Component) {
  (0, _inherits3.default)(Aggregate, _Component);

  function Aggregate(props) {
    (0, _classCallCheck3.default)(this, Aggregate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Aggregate.__proto__ || (0, _getPrototypeOf2.default)(Aggregate)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    _this.state = _this._stateFromProps(props);
    return _this;
  }

  (0, _createClass3.default)(Aggregate, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this._stateFromProps(nextProps));
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var _this2 = this;

      // convert the format Meter and Distribution want
      var series = props.values.map(function (item, index) {
        var colorIndex = 'graph-' + (index + 1);
        if ('status' === props.name) {
          colorIndex = item.value.toLowerCase();
        }
        return {
          label: item.label || item.value,
          value: item.count,
          colorIndex: colorIndex,
          onClick: _this2._onClick.bind(_this2, item.value),
          important: false
        };
      });

      if ('status' === props.name && series.length > 0) {
        // re-order by importance
        series.sort(function (s1, s2) {
          return STATUS_IMPORTANCE[s2.label.toLowerCase()] - STATUS_IMPORTANCE[s1.label.toLowerCase()];
        });
        // mark most severe as most important
        series[series.length - 1].important = true;
      }

      return { series: series };
    }
  }, {
    key: '_onClick',
    value: function _onClick(value) {
      var filters = (0, _extends3.default)({}, this.props.filters);
      filters[this.props.name] = value;
      this.props.onClick(filters);
    }
  }, {
    key: 'render',
    value: function render() {
      var result = void 0;
      if ('distribution' === this.props.type) {
        result = _react2.default.createElement(_Distribution2.default, { series: this.state.series,
          legend: true,
          legendTotal: true,
          size: this.props.size });
      } else {
        result = _react2.default.createElement(_Meter2.default, { series: this.state.series,
          legend: this.props.legend,
          size: this.props.size,
          stacked: this.props.stacked,
          type: this.props.type,
          threshold: this.props.threshold,
          a11yTitleId: this.props.a11yTitleId,
          a11yDescId: this.props.a11yTitleId });
      }

      return result;
    }
  }]);
  return Aggregate;
}(_react.Component);

exports.default = Aggregate;


Aggregate.propTypes = {
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  filters: _react.PropTypes.object, // { name: [value, ...] }
  legend: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.shape({
    total: _react.PropTypes.bool,
    placement: _react.PropTypes.oneOf(['right', 'bottom'])
  })]),
  name: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func, // (filters)
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  stacked: _react.PropTypes.bool,
  threshold: _react.PropTypes.number,
  type: _react.PropTypes.oneOf(['bar', 'arc', 'circle', 'distribution']),
  values: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string.isRequired,
    count: _react.PropTypes.number.isRequired
  }))
};

Aggregate.defaultProps = {
  values: []
};
module.exports = exports['default'];