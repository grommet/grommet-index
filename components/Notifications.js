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

var _Notification = require('grommet/components/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'resource-notifications';

var Notifications = function (_Component) {
  (0, _inherits3.default)(Notifications, _Component);

  function Notifications() {
    (0, _classCallCheck3.default)(this, Notifications);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Notifications).apply(this, arguments));
  }

  (0, _createClass3.default)(Notifications, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var notifications;
      if (this.props.notifications) {
        notifications = this.state.notifications.map(function (notification) {
          return _react2.default.createElement(_Notification2.default, { key: notification.uri, flush: false,
            status: notification.status,
            message: notification.name,
            state: notification.state,
            timestamp: new Date(notification.created) });
        }, this);
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        notifications
      );
    }
  }]);
  return Notifications;
}(_react.Component);

exports.default = Notifications;


Notifications.propTypes = {
  notifications: _react.PropTypes.arrayOf(_react2.default.PropTypes.object)
};
module.exports = exports['default'];