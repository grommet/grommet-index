'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Meter = require('grommet/components/Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Distribution = require('grommet/components/Distribution');

var _Distribution2 = _interopRequireDefault(_Distribution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var STATUS_IMPORTANCE = {
  'error': 1,
  'critical': 1,
  'warning': 2,
  'ok': 3,
  'disabled': 4,
  'unknown': 5
};

var Aggregate = function (_Component) {
  _inherits(Aggregate, _Component);

  function Aggregate(props) {
    _classCallCheck(this, Aggregate);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Aggregate).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    _this.state = _this._stateFromProps(props);
    return _this;
  }

  _createClass(Aggregate, [{
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
      var filters = _extends({}, this.props.filters);
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