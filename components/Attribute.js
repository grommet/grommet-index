'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Status = require('grommet/components/icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Timestamp = require('./Timestamp');

var _Timestamp2 = _interopRequireDefault(_Timestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "index-attribute";

var Attribute = function (_Component) {
  _inherits(Attribute, _Component);

  function Attribute() {
    _classCallCheck(this, Attribute);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Attribute).apply(this, arguments));
  }

  _createClass(Attribute, [{
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
            value: value.toLowerCase(), small: true });
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