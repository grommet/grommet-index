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

var _List = require('grommet/components/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('grommet/components/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = 'index-list'; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var IndexListItem = function (_Component) {
  (0, _inherits3.default)(IndexListItem, _Component);

  function IndexListItem() {
    (0, _classCallCheck3.default)(this, IndexListItem);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IndexListItem).apply(this, arguments));
  }

  (0, _createClass3.default)(IndexListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var item = _props.item;
      var index = _props.index;
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
          onClick: onClick },
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
  (0, _inherits3.default)(IndexList, _Component2);

  function IndexList() {
    (0, _classCallCheck3.default)(this, IndexList);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IndexList).call(this));

    _this2._onClickItem = _this2._onClickItem.bind(_this2);
    return _this2;
  }

  (0, _createClass3.default)(IndexList, [{
    key: '_onClickItem',
    value: function _onClickItem(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: '_renderListItem',
    value: function _renderListItem(item, index) {
      var itemComponent = this.props.itemComponent;

      var onClick = void 0;
      if (this.props.onSelect) {
        onClick = this._onClickItem.bind(this, item.uri);
      }
      var listItem = void 0;
      if (itemComponent) {
        var _Component3 = itemComponent;
        listItem = _react2.default.createElement(_Component3, { key: item.uri, item: item, index: index, onClick: onClick });
      } else {
        listItem = _react2.default.createElement(IndexListItem, { key: item.uri, item: item, index: index, onClick: onClick,
          attributes: this.props.attributes });
      }
      return listItem;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var data = _props2.data;
      var selection = _props2.selection;

      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var listItems = void 0;
      var selectionIndex = void 0;
      if (data && data.items) {
        listItems = data.items.map(function (item, index) {
          if (selection && item.uri === selection) {
            selectionIndex = index;
          }
          return _this3._renderListItem(item, index);
        });
      }

      var onMore = void 0;
      if (data && data.count < data.total) {
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
  data: _PropTypes2.default.data,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)])
};
module.exports = exports['default'];