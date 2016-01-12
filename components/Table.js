'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-table';

var IndexTableRow = function (_Component) {
  _inherits(IndexTableRow, _Component);

  function IndexTableRow() {
    _classCallCheck(this, IndexTableRow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IndexTableRow).apply(this, arguments));
  }

  _createClass(IndexTableRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var item = _props.item;
      var selected = _props.selected;
      var onClick = _props.onClick;
      var attributes = _props.attributes;

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
          onClick: onClick, selected: selected },
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
  _inherits(IndexTable, _Component2);

  function IndexTable(props) {
    _classCallCheck(this, IndexTable);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexTable).call(this, props));

    _this2._onClickRow = _this2._onClickRow.bind(_this2);

    _this2.state = { attributes: _this2._simplifyAttributes(props.attributes) };
    return _this2;
  }

  _createClass(IndexTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ attributes: this._simplifyAttributes(nextProps.attributes) });
    }
  }, {
    key: '_onClickRow',
    value: function _onClickRow(uri) {
      this.props.onSelect(uri);
    }
  }, {
    key: '_simplifyAttributes',
    value: function _simplifyAttributes(attributes) {
      var result = undefined;
      if (attributes) {
        result = attributes.filter(function (attribute) {
          return !attribute.hidden;
        });
      }
      return result;
    }
  }, {
    key: '_renderRow',
    value: function _renderRow(item) {
      var onClick = undefined;
      if (this.props.onSelect) {
        onClick = this._onClickRow.bind(this, item.uri);
      }
      var selected = false;
      if (this.props.selection && item.uri === this.props.selection) {
        selected = true;
      }
      var row = undefined;
      if (this.props.itemComponent) {
        row = _react2.default.createElement(this.props.itemComponent, { key: item.uri, item: item, onClick: onClick,
          selected: selected });
      } else {
        row = _react2.default.createElement(IndexTableRow, { key: item.uri, item: item, onClick: onClick,
          selected: selected, attributes: this.props.attributes });
      }
      return row;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var attributes = this.state.attributes;

      var header;
      if (attributes) {
        var headerCells = attributes.map(function (attribute) {
          var classes = [];
          if (attribute.secondary) {
            classes.push(CLASS_ROOT + "__header--secondary");
          }
          if (attribute.size) {
            classes.push(CLASS_ROOT + "__header--" + attribute.size);
          }

          var content = attribute.label;
          if ('status' === attribute.name) {
            classes.push(CLASS_ROOT + "__cell--icon");
            content = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + "__header-icon", value: 'label', small: true });
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

      var rows = undefined;
      var selectionIndex = undefined;
      if (this.props.result && this.props.result.items) {
        rows = this.props.result.items.map(function (item, index) {
          if (this.props.selection && item.uri === this.props.selection) {
            selectionIndex = index;
          }
          return this._renderRow(item);
        }, this);
      }

      var onMore = undefined;
      if (this.props.result && this.props.result.count < this.props.result.total) {
        onMore = this.props.onMore;
      }

      return _react2.default.createElement(
        _Table2.default,
        { className: classes.join(' '),
          selectable: this.props.onSelect ? true : false,
          scrollable: this.props.scrollable,
          selection: selectionIndex,
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
  result: _PropTypes2.default.result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  scrollable: _react.PropTypes.bool,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func
};

IndexTable.defaultProps = {
  scrollable: true
};
module.exports = exports['default'];