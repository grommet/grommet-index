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

var _grommetComponentsList = require('grommet/components/List');

var _grommetComponentsList2 = _interopRequireDefault(_grommetComponentsList);

var _grommetComponentsListItem = require('grommet/components/ListItem');

var _grommetComponentsListItem2 = _interopRequireDefault(_grommetComponentsListItem);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var CLASS_ROOT = 'index-list';

var IndexListItem = (function (_Component) {
  _inherits(IndexListItem, _Component);

  function IndexListItem() {
    _classCallCheck(this, IndexListItem);

    _get(Object.getPrototypeOf(IndexListItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(IndexListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var item = _props.item;
      var selected = _props.selected;
      var onClick = _props.onClick;
      var attributes = _props.attributes;

      var status = undefined;
      var primary = undefined;
      var secondary = undefined;

      attributes.forEach(function (attribute) {
        if ('status' === attribute.name) {
          status = _react2['default'].createElement(_Attribute2['default'], { key: attribute.name, item: item, attribute: attribute });
        } else if (!primary) {
          primary = _react2['default'].createElement(_Attribute2['default'], { key: attribute.name, className: 'flex', item: item, attribute: attribute });;
        } else if (!secondary) {
          secondary = _react2['default'].createElement(_Attribute2['default'], { key: attribute.name, item: item, attribute: attribute });;
        }
      }, this);

      return _react2['default'].createElement(
        _grommetComponentsListItem2['default'],
        { key: item.uri, className: CLASS_ROOT + '-item',
          direction: 'row', responsive: false, pad: { between: 'medium' },
          onClick: onClick, selected: selected },
        status,
        primary,
        secondary
      );
    }
  }]);

  return IndexListItem;
})(_react.Component);

IndexListItem.propTypes = {
  attributes: _utilsPropTypes2['default'].attributes,
  item: _react.PropTypes.object.isRequired,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};

var IndexList = (function (_Component2) {
  _inherits(IndexList, _Component2);

  function IndexList() {
    _classCallCheck(this, IndexList);

    _get(Object.getPrototypeOf(IndexList.prototype), 'constructor', this).call(this);
    this._onClickItem = this._onClickItem.bind(this);
  }

  _createClass(IndexList, [{
    key: '_onClickItem',
    value: function _onClickItem(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: '_renderListItem',
    value: function _renderListItem(item) {
      var onClick = undefined;
      if (this.props.onSelect) {
        onClick = this._onClickItem.bind(this, item.uri);
      }
      var selected = false;
      if (this.props.selection && item.uri === this.props.selection) {
        selected = true;
      }
      var listItem = undefined;
      if (this.props.itemComponent) {
        listItem = _react2['default'].createElement(this.props.itemComponent, { key: item.uri, item: item, onClick: onClick,
          selected: selected });
      } else {
        listItem = _react2['default'].createElement(IndexListItem, { key: item.uri, item: item, onClick: onClick,
          selected: selected, attributes: this.props.attributes });
      }
      return listItem;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var listItems = undefined;
      var selectionIndex = undefined;
      if (this.props.result && this.props.result.items) {
        listItems = this.props.result.items.map(function (item, index) {
          if (this.props.selection && item.uri === this.props.selection) {
            selectionIndex = index;
          }
          return this._renderListItem(item);
        }, this);
      }

      var onMore = undefined;
      if (this.props.result && this.props.result.count < this.props.result.total) {
        onMore = this.props.onMore;
      }

      return _react2['default'].createElement(
        _grommetComponentsList2['default'],
        { className: classes.join(' '),
          selectable: this.props.onSelect || false,
          selected: selectionIndex,
          onMore: onMore },
        listItems
      );
    }
  }]);

  return IndexList;
})(_react.Component);

exports['default'] = IndexList;

IndexList.propTypes = {
  attributes: _utilsPropTypes2['default'].attributes,
  itemComponent: _react.PropTypes.element,
  result: _utilsPropTypes2['default'].result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  onSelect: _react.PropTypes.func
};
module.exports = exports['default'];