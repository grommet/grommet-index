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

var _grommetComponentsIconsStatus = require('grommet/components/icons/Status');

var _grommetComponentsIconsStatus2 = _interopRequireDefault(_grommetComponentsIconsStatus);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _reactIntl = require('react-intl');

var CLASS_ROOT = "index-attribute";

var Attribute = (function (_Component) {
  _inherits(Attribute, _Component);

  function Attribute() {
    _classCallCheck(this, Attribute);

    _get(Object.getPrototypeOf(Attribute.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Attribute, [{
    key: 'render',
    value: function render() {
      var attribute = this.props.attribute;

      var classes = [CLASS_ROOT];
      if (attribute.secondary) {
        classes.push(CLASS_ROOT + "--secondary");
      }
      if (attribute.size) {
        classes.push(CLASS_ROOT + "--" + attribute.size);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var item = this.props.item;
      var content = _react2['default'].createElement(
        'span',
        null,
        '\'?\''
      );
      var value;

      if (attribute.hasOwnProperty('render')) {

        content = attribute.render(item);
        if (typeof content === 'string') {
          content = _react2['default'].createElement(
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
          content = _react2['default'].createElement(_grommetComponentsIconsStatus2['default'], { className: classes.join(' '),
            value: value.toLowerCase(), small: true });
        } else if (attribute.timestamp) {
          classes.push(CLASS_ROOT + "__timestamp");
          content = _react2['default'].createElement(
            'span',
            { className: classes.join(' ') },
            _react2['default'].createElement(_reactIntl.FormattedTime, { value: value,
              day: 'numeric',
              month: 'narrow',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit' })
          );
        } else {
          content = _react2['default'].createElement(
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
})(_react.Component);

exports['default'] = Attribute;

Attribute.propTypes = {
  item: _react.PropTypes.object.isRequired,
  attribute: _utilsPropTypes2['default'].attribute.isRequired,
  className: _react.PropTypes.string
};
module.exports = exports['default'];