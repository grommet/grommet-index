'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tiles = require('grommet/components/Tiles');

var _Tiles2 = _interopRequireDefault(_Tiles);

var _Tile = require('grommet/components/Tile');

var _Tile2 = _interopRequireDefault(_Tile);

var _Header = require('grommet/components/Header');

var _Header2 = _interopRequireDefault(_Header);

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

      var statusValue = void 0;
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

      var header = void 0;
      if (headerValues.length > 0) {
        header = _react2.default.createElement(
          'h4',
          null,
          headerValues
        );
      }

      var footer = void 0;
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
          onClick: onClick, selected: selected,
          a11yTitle: 'Open ' + headerValues },
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
      var _props2 = this.props;
      var selection = _props2.selection;
      var itemComponent = _props2.itemComponent;

      var onClick = void 0;
      if (this.props.onSelect) {
        onClick = this._onClickTile.bind(this, item.uri);
      }
      var selected = false;
      if (selection && item.uri === selection) {
        selected = true;
      }
      var tile = void 0;
      if (itemComponent) {
        var _Component3 = itemComponent;
        tile = _react2.default.createElement(_Component3, { key: item.uri, item: item, onClick: onClick,
          selected: selected });
      } else {
        tile = _react2.default.createElement(IndexTile, { key: item.uri, item: item, onClick: onClick,
          selected: selected, attributes: this.props.attributes });
      }
      return tile;
    }
  }, {
    key: '_renderSections',
    value: function _renderSections(classes, onMore) {
      var _this3 = this;

      var _props3 = this.props;
      var data = _props3.data;
      var selection = _props3.selection;
      var sort = _props3.sort;

      var parts = sort.split(':');
      var attributeName = parts[0];
      var direction = parts[1];

      var sections = [];

      if (data.sections) {
        data.sections.forEach(function (section, i) {
          var actions = section.actions;
          var items = section.items;
          var label = section.label;

          var tiles = items.map(function (item) {
            return _this3._renderTile(item);
          });

          if (tiles.length > 0) {
            // only use onMore for last section
            var content = _react2.default.createElement(
              _Tiles2.default,
              { key: label,
                onMore: i === data.sections.length - 1 ? onMore : undefined,
                flush: _this3.props.flush, fill: _this3.props.fill,
                selectable: _this3.props.onSelect ? true : false,
                size: _this3.props.size },
              tiles
            );

            sections.push(_react2.default.createElement(
              'div',
              { key: label, className: CLASS_ROOT + '__section' },
              _react2.default.createElement(
                _Header2.default,
                { size: 'small', justify: 'between', responsive: false, separator: 'top', pad: { horizontal: 'small' } },
                _react2.default.createElement(
                  'label',
                  null,
                  label
                ),
                actions
              ),
              content
            ));
          }
        });
      } else if (this.props.sections) {
        (function () {
          console.warn('Putting sections in attributes has been deprecated ' + 'and will be removed in a future release. Sections should be ' + 'part of the data object');

          var items = data.items.slice(0);

          _this3.props.sections.forEach(function (section) {

            var selectionIndex = undefined;
            var sectionValue = section.value;
            if (sectionValue instanceof Date) {
              sectionValue = sectionValue.getTime();
            }
            var tiles = [];
            var actions = section.actions;

            while (items.length > 0) {
              var item = items[0];
              var itemValue = item.hasOwnProperty(attributeName) ? item[attributeName] : item.attributes[attributeName];
              if (itemValue instanceof Date) {
                itemValue = itemValue.getTime();
              }

              if (undefined === sectionValue || 'asc' === direction && itemValue <= sectionValue || 'desc' === direction && itemValue >= sectionValue) {
                // add it
                items.shift();
                if (selection && item.uri === selection) {
                  selectionIndex = tiles.length;
                }
                tiles.push(_this3._renderTile(item));
              } else {
                // done
                break;
              }
            }

            if (tiles.length > 0) {
              // only use onMore for last section
              var content = _react2.default.createElement(
                _Tiles2.default,
                { key: section.label,
                  onMore: items.length === 0 ? onMore : undefined,
                  flush: _this3.props.flush, fill: _this3.props.fill,
                  selectable: _this3.props.onSelect ? true : false,
                  selected: selectionIndex,
                  size: _this3.props.size },
                tiles
              );

              var label = void 0;
              var justify = 'end';
              var header = void 0;

              if (sections.length !== 0 || items.length !== 0) {
                // more than one section, add label
                label = _react2.default.createElement(
                  'label',
                  null,
                  section.label
                );
                justify = 'between';
              }

              if (label || actions) {
                header = _react2.default.createElement(
                  _Header2.default,
                  { size: 'small', justify: justify, responsive: false, separator: 'top', pad: { horizontal: 'small' } },
                  label,
                  actions
                );
              }

              sections.push(_react2.default.createElement(
                'div',
                { key: section.label, className: CLASS_ROOT + '__section' },
                header,
                content
              ));
            }
          });
        })();
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        sections
      );
    }
  }, {
    key: '_renderTiles',
    value: function _renderTiles(classes, onMore) {
      var _props4 = this.props;
      var data = _props4.data;
      var selection = _props4.selection;
      var actions = _props4.actions;

      var tiles = void 0;
      var selectionIndex = void 0;
      var header = void 0;
      if (data && data.items.length) {
        tiles = data.items.map(function (item, index) {
          if (selection && item.uri === selection) {
            selectionIndex = index;
          }
          return this._renderTile(item);
        }, this);

        if (actions) {
          header = _react2.default.createElement(
            _Header2.default,
            { size: 'small', justify: 'end', responsive: false, pad: { horizontal: 'small' } },
            actions
          );
        }
      }

      return _react2.default.createElement(
        'div',
        null,
        header,
        _react2.default.createElement(
          _Tiles2.default,
          { className: classes.join(' '), onMore: onMore,
            flush: this.props.flush, fill: this.props.fill,
            selectable: this.props.onSelect ? true : false,
            selected: selectionIndex,
            size: this.props.size },
          tiles
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var data = _props5.data;
      var sort = _props5.sort;

      var classes = [CLASS_ROOT];

      if (this.props.className) {
        classes.push(this.props.className);
      }

      var onMore = void 0;
      if (data && data.count < data.total) {
        onMore = this.props.onMore;
      }

      if (data && data.sections || this.props.sections && sort && data && data.items) {
        return this._renderSections(classes, onMore);
      } else {
        return this._renderTiles(classes, onMore);
      }
    }
  }]);

  return IndexTiles;
}(_react.Component);

exports.default = IndexTiles;


IndexTiles.propTypes = {
  actions: _react.PropTypes.element,
  attributes: _PropTypes2.default.attributes,
  fill: _react.PropTypes.bool,
  flush: _react.PropTypes.bool,
  itemComponent: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
  onSelect: _react.PropTypes.func,
  data: _PropTypes2.default.data,
  sections: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    actions: _react.PropTypes.element,
    label: _react.PropTypes.string,
    value: _react.PropTypes.any
  })),
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};
module.exports = exports['default'];