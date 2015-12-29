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

var _grommetComponentsMeter = require('grommet/components/Meter');

var _grommetComponentsMeter2 = _interopRequireDefault(_grommetComponentsMeter);

var _grommetComponentsDistribution = require('grommet/components/Distribution');

var _grommetComponentsDistribution2 = _interopRequireDefault(_grommetComponentsDistribution);

var _utilsQuery = require('../utils/Query');

var _utilsQuery2 = _interopRequireDefault(_utilsQuery);

var STATUS_IMPORTANCE = {
  'error': 1,
  'critical': 1,
  'warning': 2,
  'ok': 3,
  'disabled': 4,
  'unknown': 5
};

var Aggregate = (function (_Component) {
  _inherits(Aggregate, _Component);

  function Aggregate(props) {
    _classCallCheck(this, Aggregate);

    _get(Object.getPrototypeOf(Aggregate.prototype), 'constructor', this).call(this, props);

    this._onClick = this._onClick.bind(this);

    this.state = this._stateFromProps(props);
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
        query = _utilsQuery2['default'].create();
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
        component = _react2['default'].createElement(_grommetComponentsDistribution2['default'], { series: this.state.series || [],
          legend: true,
          legendTotal: true,
          size: this.props.size });
      } else {
        component = _react2['default'].createElement(_grommetComponentsMeter2['default'], { series: this.state.series || [],
          legend: this.props.legend,
          size: this.props.size,
          type: this.props.type,
          threshold: this.props.threshold });
      }

      return component;
    }
  }]);

  return Aggregate;
})(_react.Component);

exports['default'] = Aggregate;

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