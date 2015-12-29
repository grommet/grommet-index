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

var _grommetComponentsTiles = require('grommet/components/Tiles');

var _grommetComponentsTiles2 = _interopRequireDefault(_grommetComponentsTiles);

var _grommetComponentsTile = require('grommet/components/Tile');

var _grommetComponentsTile2 = _interopRequireDefault(_grommetComponentsTile);

var _grommetComponentsFooter = require('grommet/components/Footer');

var _grommetComponentsFooter2 = _interopRequireDefault(_grommetComponentsFooter);

var _grommetComponentsBox = require('grommet/components/Box');

var _grommetComponentsBox2 = _interopRequireDefault(_grommetComponentsBox);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var CLASS_ROOT = 'index-tiles';

var IndexTiles = (function (_Component) {
  _inherits(IndexTiles, _Component);

  function IndexTiles() {
    _classCallCheck(this, IndexTiles);

    _get(Object.getPrototypeOf(IndexTiles.prototype), 'constructor', this).call(this);

    this._onClick = this._onClick.bind(this);
  }

  _createClass(IndexTiles, [{
    key: '_onClick',
    value: function _onClick(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var tiles = null;
      if (this.props.result && this.props.result.items) {
        tiles = this.props.result.items.map(function (item) {

          var statusValue;
          var headerValues = [];
          var values = [];
          var footerValues = [];

          this.props.attributes.forEach(function (attribute) {
            var value = _react2['default'].createElement(_Attribute2['default'], { key: attribute.name,
              item: item, attribute: attribute });
            if ('status' === attribute.name) {
              statusValue = value;
            } else if (attribute.header) {
              headerValues.push(value);
            } else if (attribute.footer) {
              footerValues.push(value);
            } else {
              values.push(value);
            }
          }, this);

          var header = null;
          if (headerValues.length > 0) {
            header = _react2['default'].createElement(
              'h4',
              null,
              headerValues
            );
          }

          var footer = null;
          if (footerValues.length > 0) {
            footer = _react2['default'].createElement(
              _grommetComponentsFooter2['default'],
              { small: true },
              _react2['default'].createElement(
                'span',
                null,
                footerValues
              )
            );
          }

          var selected = false;
          if (this.props.selection && item.uri === this.props.selection) {
            selected = true;
          }

          return _react2['default'].createElement(
            _grommetComponentsTile2['default'],
            { key: item.uri, align: 'start',
              pad: { horizontal: "medium", vertical: "small" },
              direction: 'row', responsive: false,
              onClick: this._onClick.bind(this, item.uri),
              selected: selected },
            statusValue,
            _react2['default'].createElement(
              _grommetComponentsBox2['default'],
              { direction: 'column' },
              header,
              values,
              footer
            )
          );
        }, this);
      }

      var onMore = null;
      if (this.props.result && this.props.result.count < this.props.result.total) {
        onMore = this.props.onMore;
      }

      return _react2['default'].createElement(
        _grommetComponentsTiles2['default'],
        { className: classes.join(' '), onMore: onMore, flush: true,
          size: this.props.size },
        tiles
      );
    }
  }]);

  return IndexTiles;
})(_react.Component);

exports['default'] = IndexTiles;

IndexTiles.propTypes = {
  attributes: _utilsPropTypes2['default'].attributes,
  result: _utilsPropTypes2['default'].result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  onSelect: _react.PropTypes.func
};
module.exports = exports['default'];