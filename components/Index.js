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

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Tiles = require('./Tiles');

var _Tiles2 = _interopRequireDefault(_Tiles);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var CLASS_ROOT = 'index';

var VIEW_COMPONENT = {
  list: _List2['default'],
  tiles: _Tiles2['default'],
  table: _Table2['default']
};

var Index = (function (_Component) {
  _inherits(Index, _Component);

  function Index() {
    _classCallCheck(this, Index);

    _get(Object.getPrototypeOf(Index.prototype), 'constructor', this).call(this);

    this._onQuery = this._onQuery.bind(this);
  }

  _createClass(Index, [{
    key: '_onQuery',
    value: function _onQuery(query) {
      if (this.props.onQuery) {
        this.props.onQuery(query);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var error = undefined;
      if (this.props.result && this.props.result.error) {
        error = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__error" },
          this.props.result.error
        );
      }

      var ViewComponent = VIEW_COMPONENT[this.props.view];

      return _react2['default'].createElement(
        'div',
        { className: classes.join(' ') },
        _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__container" },
          _react2['default'].createElement(_Header2['default'], { className: CLASS_ROOT + "__header",
            label: this.props.label,
            attributes: this.props.attributes,
            query: this.props.query,
            result: this.props.result,
            fixed: true,
            onQuery: this._onQuery,
            addControl: this.props.addControl,
            navControl: this.props.navControl }),
          error,
          _react2['default'].createElement(
            'div',
            { ref: 'items', className: CLASS_ROOT + "__items" },
            _react2['default'].createElement(ViewComponent, {
              attributes: this.props.attributes,
              itemComponent: this.props.itemComponent,
              result: this.props.result,
              selection: this.props.selection,
              size: this.props.size,
              onSelect: this.props.onSelect,
              onMore: this.props.onMore })
          )
        )
      );
    }
  }]);

  return Index;
})(_react.Component);

exports['default'] = Index;

Index.propTypes = {
  addControl: _react.PropTypes.node,
  attributes: _utilsPropTypes2['default'].attributes,
  itemComponent: _react.PropTypes.element,
  label: _react.PropTypes.string,
  onMore: _react.PropTypes.func,
  onQuery: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  query: _react.PropTypes.object,
  navControl: _react.PropTypes.node,
  result: _utilsPropTypes2['default'].result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  view: _react.PropTypes.oneOf(["table", "tiles", "list"])
};

Index.defaultProps = {
  attributes: [{ name: 'name', label: 'Name', index: 0 }],
  flush: true,
  view: "tiles"
};
module.exports = exports['default'];