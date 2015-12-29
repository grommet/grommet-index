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

var _grommetComponentsTable = require('grommet/components/Table');

var _grommetComponentsTable2 = _interopRequireDefault(_grommetComponentsTable);

var _grommetComponentsIconsStatus = require('grommet/components/icons/Status');

var _grommetComponentsIconsStatus2 = _interopRequireDefault(_grommetComponentsIconsStatus);

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var CLASS_ROOT = 'index-table';

var IndexTable = (function (_Component) {
  _inherits(IndexTable, _Component);

  function IndexTable(props) {
    _classCallCheck(this, IndexTable);

    _get(Object.getPrototypeOf(IndexTable.prototype), 'constructor', this).call(this, props);

    this._onClickRow = this._onClickRow.bind(this);

    this.state = { attributes: this._simplifyAttributes(props.attributes) };
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
      return attributes.filter(function (attribute) {
        return !attribute.hidden;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var attributes = this.state.attributes;

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
          content = _react2['default'].createElement(_grommetComponentsIconsStatus2['default'], { className: CLASS_ROOT + "__header-icon", value: 'label', small: true });
        }

        return _react2['default'].createElement(
          'th',
          { key: attribute.name, className: classes.join(' ') },
          content
        );
      }, this);

      var rows = null;
      var selectionIndex = null;
      if (this.props.result && this.props.result.items) {
        rows = this.props.result.items.map(function (item, index) {
          if (this.props.selection && item.uri === this.props.selection) {
            selectionIndex = index;
          }
          var cells = attributes.map(function (attribute) {
            return _react2['default'].createElement(
              'td',
              { key: attribute.name },
              _react2['default'].createElement(_Attribute2['default'], { item: item, attribute: attribute })
            );
          }, this);
          return _react2['default'].createElement(
            'tr',
            { key: item.uri, onClick: this._onClickRow.bind(this, item.uri) },
            cells
          );
        }, this);
      }

      var onMore = null;
      if (this.props.result && this.props.result.count < this.props.result.total) {
        onMore = this.props.onMore;
      }

      return _react2['default'].createElement(
        _grommetComponentsTable2['default'],
        { className: classes.join(' '),
          selectable: true,
          scrollable: true,
          selection: selectionIndex,
          onMore: onMore },
        _react2['default'].createElement(
          'thead',
          null,
          _react2['default'].createElement(
            'tr',
            null,
            headerCells
          )
        ),
        _react2['default'].createElement(
          'tbody',
          null,
          rows
        )
      );
    }
  }]);

  return IndexTable;
})(_react.Component);

exports['default'] = IndexTable;

IndexTable.propTypes = {
  attributes: _utilsPropTypes2['default'].attributes,
  result: _utilsPropTypes2['default'].result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func
};
module.exports = exports['default'];