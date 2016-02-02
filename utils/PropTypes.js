'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var attribute = _react.PropTypes.shape({
  filter: _react.PropTypes.shape({
    all: _react.PropTypes.bool,
    values: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      label: _react.PropTypes.string,
      value: _react.PropTypes.string
    })).isRequired
  }),
  header: _react.PropTypes.bool,
  hidden: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  render: _react.PropTypes.func,
  size: _react.PropTypes.string,
  sort: _react.PropTypes.shape({
    direction: _react.PropTypes.string,
    sections: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      label: _react.PropTypes.string,
      value: _react.PropTypes.any
    }))
  }),
  timestamp: _react.PropTypes.bool
}); // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

exports.default = {
  attribute: attribute,
  attributes: _react.PropTypes.arrayOf(attribute),
  query: _react.PropTypes.object,
  result: _react.PropTypes.shape({
    total: _react.PropTypes.number.isRequired,
    unfilteredTotal: _react.PropTypes.number,
    start: _react.PropTypes.number,
    count: _react.PropTypes.number.isRequired,
    items: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    error: _react.PropTypes.string
  })
};
module.exports = exports['default'];