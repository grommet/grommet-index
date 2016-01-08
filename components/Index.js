'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Tiles = require('./Tiles');

var _Tiles2 = _interopRequireDefault(_Tiles);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index';

var VIEW_COMPONENT = {
  list: _List2.default,
  tiles: _Tiles2.default,
  table: _Table2.default
};

var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index() {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Index).call(this));

    _this._onQuery = _this._onQuery.bind(_this);
    return _this;
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
        error = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__error" },
          this.props.result.error
        );
      }

      var ViewComponent = VIEW_COMPONENT[this.props.view];

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__container" },
          _react2.default.createElement(_Header2.default, { className: CLASS_ROOT + "__header",
            label: this.props.label,
            attributes: this.props.attributes,
            query: this.props.query,
            result: this.props.result,
            fixed: true,
            onQuery: this._onQuery,
            addControl: this.props.addControl,
            navControl: this.props.navControl }),
          error,
          _react2.default.createElement(
            'div',
            { ref: 'items', className: CLASS_ROOT + "__items" },
            _react2.default.createElement(ViewComponent, {
              attributes: this.props.attributes,
              fill: this.props.fill,
              flush: this.props.flush,
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
}(_react.Component);

exports.default = Index;

Index.propTypes = {
  addControl: _react.PropTypes.node,
  attributes: _PropTypes2.default.attributes,
  fill: _react.PropTypes.bool, // for Tiles
  flush: _react.PropTypes.bool, // for Tiles
  itemComponent: _react.PropTypes.object,
  label: _react.PropTypes.string,
  onMore: _react.PropTypes.func,
  onQuery: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  query: _react.PropTypes.object,
  navControl: _react.PropTypes.node,
  result: _PropTypes2.default.result,
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