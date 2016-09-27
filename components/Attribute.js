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

var _Status = require('grommet/components/icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Timestamp = require('./Timestamp');

var _Timestamp2 = _interopRequireDefault(_Timestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "index-attribute";

var Attribute = function (_Component) {
  (0, _inherits3.default)(Attribute, _Component);

  function Attribute() {
    (0, _classCallCheck3.default)(this, Attribute);
    return (0, _possibleConstructorReturn3.default)(this, (Attribute.__proto__ || (0, _getPrototypeOf2.default)(Attribute)).apply(this, arguments));
  }

  (0, _createClass3.default)(Attribute, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var attribute = _props.attribute;
      var item = _props.item;


      var classes = [CLASS_ROOT];
      if (attribute.secondary) {
        classes.push(CLASS_ROOT + '--secondary');
      }
      if (attribute.size) {
        classes.push(CLASS_ROOT + '--' + attribute.size);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var content = _react2.default.createElement(
        'span',
        null,
        '\'?\''
      );
      var value = void 0;

      if (attribute.hasOwnProperty('render')) {

        content = attribute.render(item);
        if (typeof content === 'string') {
          content = _react2.default.createElement(
            'span',
            { className: classes.join(' ') },
            content
          );
        }
      } else {

        if (item.hasOwnProperty(attribute.name)) {
          value = item[attribute.name];
        } else if (item.attributes && item.attributes.hasOwnProperty(attribute.name)) {
          value = item.attributes[attribute.name];
        }

        if ('status' === attribute.name) {
          content = _react2.default.createElement(_Status2.default, { className: classes.join(' '),
            value: value.toLowerCase(), size: 'small' });
        } else if (attribute.timestamp) {
          classes.push(CLASS_ROOT + '__timestamp');
          content = _react2.default.createElement(_Timestamp2.default, { className: classes.join(' '), value: value });
        } else {
          content = _react2.default.createElement(
            'span',
            { className: classes.join(' ') },
            value
          );
        }
      }

      return content;
    }
  }]);
  return Attribute;
}(_react.Component);

exports.default = Attribute;


Attribute.propTypes = {
  item: _react.PropTypes.object.isRequired,
  attribute: _PropTypes2.default.attribute.isRequired
};
module.exports = exports['default'];