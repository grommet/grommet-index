'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('grommet/components/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('grommet/components/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-list';

var IndexListItem = function (_Component) {
  _inherits(IndexListItem, _Component);

  function IndexListItem() {
    _classCallCheck(this, IndexListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IndexListItem).apply(this, arguments));
  }

  _createClass(IndexListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var item = _props.item;
      var index = _props.index;
      var selected = _props.selected;
      var onClick = _props.onClick;
      var attributes = _props.attributes;

      var status = void 0,
          primary = void 0,
          secondary = void 0,
          separator = void 0;

      attributes.forEach(function (attribute) {
        if ('status' === attribute.name) {
          status = _react2.default.createElement(_Attribute2.default, { key: attribute.name, item: item, attribute: attribute });
        } else if (!primary) {
          primary = _react2.default.createElement(_Attribute2.default, { key: attribute.name, className: 'flex', item: item, attribute: attribute });;
        } else if (!secondary) {
          secondary = _react2.default.createElement(_Attribute2.default, { key: attribute.name, item: item, attribute: attribute });;
        }
      });

      if (0 === index) {
        separator = 'horizontal';
      }

      return _react2.default.createElement(
        _ListItem2.default,
        { key: item.uri, className: CLASS_ROOT + '-item',
          direction: 'row', responsive: false, separator: separator,
          pad: { horizontal: 'medium', vertical: 'small', between: 'medium' },
          onClick: onClick, selected: selected },
        status,
        primary,
        secondary
      );
    }
  }]);

  return IndexListItem;
}(_react.Component);

IndexListItem.propTypes = {
  attributes: _PropTypes2.default.attributes,
  item: _react.PropTypes.object.isRequired,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};

var IndexList = function (_Component2) {
  _inherits(IndexList, _Component2);

  function IndexList() {
    _classCallCheck(this, IndexList);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexList).call(this));

    _this2._onClickItem = _this2._onClickItem.bind(_this2);
    return _this2;
  }

  _createClass(IndexList, [{
    key: '_onClickItem',
    value: function _onClickItem(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: '_renderListItem',
    value: function _renderListItem(item, index) {
      var _props2 = this.props;
      var selection = _props2.selection;
      var itemComponent = _props2.itemComponent;

      var onClick = void 0;
      if (this.props.onSelect) {
        onClick = this._onClickItem.bind(this, item.uri);
      }
      var selected = false;
      if (selection && item.uri === selection) {
        selected = true;
      }
      var listItem = void 0;
      if (itemComponent) {
        var _Component3 = itemComponent;
        listItem = _react2.default.createElement(_Component3, { key: item.uri, item: item, index: index, onClick: onClick,
          selected: selected });
      } else {
        listItem = _react2.default.createElement(IndexListItem, { key: item.uri, item: item, index: index, onClick: onClick,
          selected: selected, attributes: this.props.attributes });
      }
      return listItem;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props;
      var result = _props3.result;
      var selection = _props3.selection;

      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var listItems = void 0;
      var selectionIndex = void 0;
      if (result && result.items) {
        listItems = result.items.map(function (item, index) {
          if (selection && item.uri === selection) {
            selectionIndex = index;
          }
          return _this3._renderListItem(item, index);
        });
      }

      var onMore = void 0;
      if (result && result.count < result.total) {
        onMore = this.props.onMore;
      }

      return _react2.default.createElement(
        _List2.default,
        { className: classes.join(' '),
          selectable: this.props.onSelect ? true : false,
          selected: selectionIndex,
          onMore: onMore },
        listItems
      );
    }
  }]);

  return IndexList;
}(_react.Component);

exports.default = IndexList;


IndexList.propTypes = {
  attributes: _PropTypes2.default.attributes,
  itemComponent: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
  onSelect: _react.PropTypes.func,
  result: _PropTypes2.default.result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)])
};
module.exports = exports['default'];