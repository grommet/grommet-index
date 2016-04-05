'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BulkOperations;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BulkOperations(_ref) {
  var component = _ref.component;
  var items = _ref.items;

  var Component = component;
  return _react2.default.createElement(
    _Box2.default,
    { pad: { horizontal: 'small' } },
    _react2.default.createElement(
      _Menu2.default,
      { size: 'small', inline: false, dropAlign: { right: 'right' }, direction: 'column' },
      _react2.default.createElement(Component, { items: items })
    )
  );
} // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

;

BulkOperations.propTypes = {
  component: _react.PropTypes.func.isRequired,
  items: _react.PropTypes.array
};
module.exports = exports['default'];