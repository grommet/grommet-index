'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tiles = require('grommet/components/Tiles');

var _Tiles2 = _interopRequireDefault(_Tiles);

var _Tile = require('grommet/components/Tile');

var _Tile2 = _interopRequireDefault(_Tile);

var _Footer = require('grommet/components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-tiles';

var IndexTile = function (_Component) {
  _inherits(IndexTile, _Component);

  function IndexTile() {
    _classCallCheck(this, IndexTile);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IndexTile).apply(this, arguments));
  }

  _createClass(IndexTile, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var item = _props.item;
      var selected = _props.selected;
      var onClick = _props.onClick;
      var attributes = _props.attributes;

      var statusValue = undefined;
      var headerValues = [];
      var values = [];
      var footerValues = [];

      attributes.forEach(function (attribute) {
        var value = _react2.default.createElement(_Attribute2.default, { key: attribute.name,
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

      var header = undefined;
      if (headerValues.length > 0) {
        header = _react2.default.createElement(
          'h4',
          null,
          headerValues
        );
      }

      var footer = undefined;
      if (footerValues.length > 0) {
        footer = _react2.default.createElement(
          _Footer2.default,
          { small: true },
          _react2.default.createElement(
            'span',
            null,
            footerValues
          )
        );
      }

      return _react2.default.createElement(
        _Tile2.default,
        { key: item.uri, align: 'start',
          pad: { horizontal: "medium", vertical: "small" },
          direction: 'row', responsive: false,
          onClick: onClick, selected: selected },
        statusValue,
        _react2.default.createElement(
          _Box2.default,
          { key: 'contents', direction: 'column' },
          header,
          values,
          footer
        )
      );
    }
  }]);

  return IndexTile;
}(_react.Component);

IndexTile.propTypes = {
  attributes: _PropTypes2.default.attributes,
  item: _react.PropTypes.object.isRequired,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};

var IndexTiles = function (_Component2) {
  _inherits(IndexTiles, _Component2);

  function IndexTiles() {
    _classCallCheck(this, IndexTiles);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexTiles).call(this));

    _this2._onClickTile = _this2._onClickTile.bind(_this2);
    return _this2;
  }

  _createClass(IndexTiles, [{
    key: '_onClickTile',
    value: function _onClickTile(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: '_renderTile',
    value: function _renderTile(item) {
      var onClick = undefined;
      if (this.props.onSelect) {
        onClick = this._onClickTile.bind(this, item.uri);
      }
      var selected = false;
      if (this.props.selection && item.uri === this.props.selection) {
        selected = true;
      }
      var tile = undefined;
      if (this.props.itemComponent) {
        tile = _react2.default.createElement(this.props.itemComponent, { key: item.uri, item: item, onClick: onClick,
          selected: selected });
      } else {
        tile = _react2.default.createElement(IndexTile, { key: item.uri, item: item, onClick: onClick,
          selected: selected, attributes: this.props.attributes });
      }
      return tile;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var tiles = undefined;
      var selectionIndex = undefined;
      if (this.props.result && this.props.result.items) {
        tiles = this.props.result.items.map(function (item, index) {
          if (this.props.selection && item.uri === this.props.selection) {
            selectionIndex = index;
          }
          return this._renderTile(item);
        }, this);
      }

      var onMore = undefined;
      if (this.props.result && this.props.result.count < this.props.result.total) {
        onMore = this.props.onMore;
      }

      return _react2.default.createElement(
        _Tiles2.default,
        { className: classes.join(' '), onMore: onMore,
          flush: this.props.flush, fill: this.props.fill,
          selectable: this.props.onSelect ? true : false,
          selected: selectionIndex,
          size: this.props.size },
        tiles
      );
    }
  }]);

  return IndexTiles;
}(_react.Component);

exports.default = IndexTiles;

IndexTiles.propTypes = {
  attributes: _PropTypes2.default.attributes,
  fill: _react.PropTypes.bool,
  flush: _react.PropTypes.bool,
  itemComponent: _react.PropTypes.object,
  result: _PropTypes2.default.result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  onSelect: _react.PropTypes.func
};
module.exports = exports['default'];