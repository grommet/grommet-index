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

var _Table = require('grommet/components/Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableRow = require('grommet/components/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Status = require('grommet/components/icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-table';

var IndexTableRow = function (_Component) {
  (0, _inherits3.default)(IndexTableRow, _Component);

  function IndexTableRow() {
    (0, _classCallCheck3.default)(this, IndexTableRow);
    return (0, _possibleConstructorReturn3.default)(this, (IndexTableRow.__proto__ || (0, _getPrototypeOf2.default)(IndexTableRow)).apply(this, arguments));
  }

  (0, _createClass3.default)(IndexTableRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          item = _props.item,
          onClick = _props.onClick,
          attributes = _props.attributes;


      var cells = attributes.map(function (attribute, index) {
        return _react2.default.createElement(
          'td',
          { key: attribute.name },
          _react2.default.createElement(_Attribute2.default, { item: item, attribute: attribute })
        );
      }, this);

      return _react2.default.createElement(
        _TableRow2.default,
        { key: item.uri,
          onClick: onClick },
        cells
      );
    }
  }]);
  return IndexTableRow;
}(_react.Component);

IndexTableRow.propTypes = {
  attributes: _PropTypes2.default.attributes,
  item: _react.PropTypes.object.isRequired,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};

var IndexTable = function (_Component2) {
  (0, _inherits3.default)(IndexTable, _Component2);

  function IndexTable(props) {
    (0, _classCallCheck3.default)(this, IndexTable);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (IndexTable.__proto__ || (0, _getPrototypeOf2.default)(IndexTable)).call(this, props));

    _this2._onClickRow = _this2._onClickRow.bind(_this2);
    _this2.state = { attributes: _this2._simplifyAttributes(props.attributes) };
    return _this2;
  }

  (0, _createClass3.default)(IndexTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ attributes: this._simplifyAttributes(nextProps.attributes) });
    }
  }, {
    key: '_simplifyAttributes',
    value: function _simplifyAttributes(attributes) {
      var result = void 0;
      if (attributes) {
        result = attributes.filter(function (attribute) {
          return !attribute.hidden;
        });
      }
      return result;
    }
  }, {
    key: '_onClickRow',
    value: function _onClickRow(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: '_renderRow',
    value: function _renderRow(item) {
      var itemComponent = this.props.itemComponent;

      var onClick = void 0;
      if (this.props.onSelect) {
        onClick = this._onClickRow.bind(this, item.uri);
      }
      var row = void 0;
      if (itemComponent) {
        var _Component3 = itemComponent;
        row = _react2.default.createElement(_Component3, { key: item.uri, item: item, onClick: onClick });
      } else {
        row = _react2.default.createElement(IndexTableRow, { key: item.uri, item: item, onClick: onClick,
          attributes: this.props.attributes });
      }
      return row;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          data = _props2.data,
          selection = _props2.selection;
      var attributes = this.state.attributes;

      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var header;
      if (attributes) {
        var headerCells = attributes.map(function (attribute) {
          var classes = [];
          if (attribute.secondary) {
            classes.push(CLASS_ROOT + '__header--secondary');
          }
          if (attribute.size) {
            classes.push(CLASS_ROOT + '__header--' + attribute.size);
          }

          var content = attribute.label;
          if ('status' === attribute.name) {
            classes.push(CLASS_ROOT + '__cell--icon');
            content = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + '__header-icon',
              value: 'label', size: 'small' });
          }

          return _react2.default.createElement(
            'th',
            { key: attribute.name, className: classes.join(' ') },
            content
          );
        }, this);

        header = _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            headerCells
          )
        );
      }

      var rows = void 0;
      var multiSelected = Array.isArray(selection);
      var selectionIndex = multiSelected ? [] : undefined;
      if (data && data.items) {
        rows = data.items.map(function (item, index) {
          if (selection) {
            if (!multiSelected && item.uri === selection) {
              selectionIndex = index;
            } else if (multiSelected && selection.includes(item.uri)) {
              selectionIndex.push(index);
            }
          }
          return _this3._renderRow(item);
        });
      }

      var onMore = void 0;
      if (data && data.count < data.total) {
        onMore = this.props.onMore;
      }

      var selectable = false;
      if (this.props.onSelect) {
        selectable = multiSelected ? 'multiple' : true;
      }

      return _react2.default.createElement(
        _Table2.default,
        { className: classes.join(' '),
          selectable: selectable,
          scrollable: this.props.scrollable,
          selected: selectionIndex,
          onMore: onMore },
        header,
        _react2.default.createElement(
          'tbody',
          null,
          rows
        )
      );
    }
  }]);
  return IndexTable;
}(_react.Component);

exports.default = IndexTable;


IndexTable.propTypes = {
  attributes: _PropTypes2.default.attributes,
  itemComponent: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  data: _PropTypes2.default.data,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  scrollable: _react.PropTypes.bool
};

IndexTable.defaultProps = {
  scrollable: true
};
module.exports = exports['default'];