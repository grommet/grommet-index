'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var attribute = _react.PropTypes.shape({
  name: _react.PropTypes.string,
  header: _react.PropTypes.bool,
  hidden: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  size: _react.PropTypes.string,
  timestamp: _react.PropTypes.bool,
  render: _react.PropTypes.func
}); // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

exports.default = {
  attribute: attribute,
  attributes: _react.PropTypes.arrayOf(attribute),
  result: _react.PropTypes.shape({
    total: _react.PropTypes.number,
    unfilteredTotal: _react.PropTypes.number,
    start: _react.PropTypes.number,
    count: _react.PropTypes.number,
    items: _react.PropTypes.arrayOf(_react.PropTypes.object),
    error: _react.PropTypes.string
  })
};
module.exports = exports['default'];