'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Meter = require('grommet/components/Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Distribution = require('grommet/components/Distribution');

var _Distribution2 = _interopRequireDefault(_Distribution);

var _Query = require('../utils/Query');

var _Query2 = _interopRequireDefault(_Query);

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
    key: '_onClick',
    value: function _onClick(value) {
      var query;
      if (this.props.query) {
        query = this.props.query.clone();
      } else {
        query = _Query2.default.create();
      }
      query.replaceAttributeValues(this.props.attribute, [value]);
      this.props.onClick(query);
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var series = (props.series || []).map(function (item, index) {
        var colorIndex = 'graph-' + (index + 1);
        if ('status' === props.attribute) {
          colorIndex = item.value.toLowerCase();
        }
        return {
          label: item.label || item.value,
          value: item.count,
          colorIndex: colorIndex,
          onClick: this._onClick.bind(this, item.value),
          important: false
        };
      }, this);

      if ('status' === props.attribute && series.length > 0) {
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
    key: 'render',
    value: function render() {
      var component;
      if ('distribution' === this.props.type) {
        component = _react2.default.createElement(_Distribution2.default, { series: this.state.series || [],
          legend: true,
          legendTotal: true,
          size: this.props.size });
      } else {
        component = _react2.default.createElement(_Meter2.default, { series: this.state.series || [],
          legend: this.props.legend,
          size: this.props.size,
          type: this.props.type,
          threshold: this.props.threshold });
      }

      return component;
    }
  }]);

  return Aggregate;
}(_react.Component);

exports.default = Aggregate;

Aggregate.propTypes = {
  attribute: _react.PropTypes.string.isRequired,
  legend: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.shape({
    total: _react.PropTypes.bool,
    placement: _react.PropTypes.oneOf(['right', 'bottom'])
  })]),
  onClick: _react.PropTypes.func,
  query: _react.PropTypes.object,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string.isRequired,
    count: _react.PropTypes.number.isRequired
  })),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  threshold: _react.PropTypes.number,
  type: _react.PropTypes.oneOf(['bar', 'arc', 'circle', 'distribution'])
};
module.exports = exports['default'];