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

var _Attribute = require('./Attribute');

var _Attribute2 = _interopRequireDefault(_Attribute);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var CLASS_ROOT = 'index-list';

var IndexList = (function (_Component) {
  _inherits(IndexList, _Component);

  function IndexList() {
    _classCallCheck(this, IndexList);

    _get(Object.getPrototypeOf(IndexList.prototype), 'constructor', this).call(this);

    this._onSelect = this._onSelect.bind(this);
  }

  _createClass(IndexList, [{
    key: '_onSelect',
    value: function _onSelect(item) {
      this.props.onSelect(item.uri);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      // build List scheme from attributes
      var schema = [{ attribute: 'uri', uid: true }];
      var havePrimary = false;
      var haveSecondary = false;
      this.props.attributes.forEach(function (attribute) {
        if ('status' === attribute.name) {
          schema.push({ attribute: 'status', image: true });
        } else if (!havePrimary) {
          schema.push({ attribute: attribute.name, primary: true,
            '_timestamp': attribute.timestamp });
          havePrimary = true;
        } else if (!haveSecondary && attribute.secondary) {
          schema.push({ attribute: attribute.name, secondary: true,
            '_timestamp': attribute.timestamp });
          haveSecondary = true;
        }
      });

      var data = [];
      if (this.props.result && this.props.result.items) {
        data = this.props.result.items.map(function (item) {
          var dataItem = { uri: item.uri };

          schema.forEach(function (scheme) {
            if (!scheme.uid) {
              dataItem[scheme.attribute] = _react2['default'].createElement(_Attribute2['default'], { key: scheme.attribute,
                item: item,
                attribute: { name: scheme.attribute, timestamp: scheme._timestamp } });
            }
          }, this);

          return dataItem;
        }, this);
      }

      var onMore = null;
      if (this.props.result && this.props.result.count < this.props.result.total) {
        onMore = this.props.onMore;
      }

      return _react2['default'].createElement(_grommetComponentsList2['default'], { className: classes.join(' '),
        schema: schema, data: data, selected: this.props.selection,
        onMore: onMore, onSelect: this._onSelect });
    }
  }]);

  return IndexList;
})(_react.Component);

exports['default'] = IndexList;

IndexList.propTypes = {
  attributes: _utilsPropTypes2['default'].attributes,
  result: _utilsPropTypes2['default'].result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  onSelect: _react.PropTypes.func
};
module.exports = exports['default'];