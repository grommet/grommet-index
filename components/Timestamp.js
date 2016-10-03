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

var _Locale = require('grommet/utils/Locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'timestamp';

var Timestamp = function (_Component) {
  (0, _inherits3.default)(Timestamp, _Component);

  function Timestamp() {
    (0, _classCallCheck3.default)(this, Timestamp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Timestamp.__proto__ || (0, _getPrototypeOf2.default)(Timestamp)).call(this));

    console.warn("grommet-index Timestamp is deprecated in favor of " + "grommet Timestamp");
    return _this;
  }

  (0, _createClass3.default)(Timestamp, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--' + this.props.align);
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var locale = (0, _Locale.getCurrentLocale)();
      var value = typeof this.props.value === 'string' ? new Date(this.props.value) : this.props.value;
      var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      var date = value.toLocaleDateString(locale, dateOptions);
      var timeOptions = { hour: '2-digit', minute: '2-digit' };
      var time = value.toLocaleTimeString(locale, timeOptions);
      return _react2.default.createElement(
        'span',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__date' },
          date
        ),
        ' ',
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__time' },
          time
        )
      );
    }
  }]);
  return Timestamp;
}(_react.Component);

exports.default = Timestamp;


Timestamp.propTypes = {
  align: _react.PropTypes.oneOf(['left', 'right']),
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired
};

Timestamp.defaultProps = {
  align: 'left'
};
module.exports = exports['default'];