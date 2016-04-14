'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Responsive = require('grommet/utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

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

var _Intl = require('grommet/utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

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

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this.state = { responsiveSize: 'medium' };
    return _this;
  }

  _createClass(Index, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._responsive = _Responsive2.default.start(this._onResponsive);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._responsive.stop();
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      this.setState({ responsiveSize: small ? 'small' : 'medium' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var result = _props.result;
      var notifications = _props.notifications;

      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var error = void 0;
      if (result && result.error) {
        error = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__error' },
          this.props.result.error
        );
      }

      var empty = void 0;
      if (result) {
        var emptyMessage = void 0;
        var addControl = void 0;
        if (result.unfilteredTotal === 0) {
          emptyMessage = this.props.emptyMessage;
          if (this.props.emptyAddControl) {
            addControl = this.props.emptyAddControl;
          } else {
            addControl = this.props.addControl;
          }
        } else if (result.total === 0) {
          emptyMessage = _Intl2.default.getMessage(this.context.intl, 'No matches');
        }
        if (emptyMessage) {
          empty = _react2.default.createElement(
            _Box2.default,
            { className: CLASS_ROOT + '__empty',
              pad: { horizontal: 'medium', vertical: 'large', between: 'medium' },
              justify: 'center', align: 'center' },
            _react2.default.createElement(
              'span',
              { className: 'secondary' },
              emptyMessage
            ),
            addControl
          );
        }
      }

      var view = this.props.view;
      var itemComponent = this.props.itemComponent;
      if ((typeof view === 'undefined' ? 'undefined' : _typeof(view)) === 'object') {
        view = view[this.state.responsiveSize];
      }
      if ((typeof itemComponent === 'undefined' ? 'undefined' : _typeof(itemComponent)) === 'object') {
        itemComponent = itemComponent[this.state.responsiveSize];
      }
      var ViewComponent = VIEW_COMPONENT[view];

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__container' },
          _react2.default.createElement(_Header2.default, { className: CLASS_ROOT + '__header',
            label: this.props.label,
            attributes: this.props.attributes,
            filter: this.props.filter, onFilter: this.props.onFilter,
            query: this.props.query, onQuery: this.props.onQuery,
            sort: this.props.sort, onSort: this.props.onSort,
            result: result,
            fixed: this.props.fixed,
            addControl: this.props.addControl,
            navControl: this.props.navControl }),
          error,
          notifications,
          _react2.default.createElement(
            'div',
            { ref: 'items', className: CLASS_ROOT + '__items' },
            _react2.default.createElement(ViewComponent, {
              actions: this.props.actions,
              attributes: this.props.attributes,
              fill: this.props.fill,
              flush: this.props.flush,
              itemComponent: itemComponent,
              result: this.props.result,
              sections: this.props.sections,
              selection: this.props.selection,
              size: this.props.size,
              sort: this.props.sort,
              onSelect: this.props.onSelect,
              onMore: this.props.onMore }),
            empty
          )
        )
      );
    }
  }]);

  return Index;
}(_react.Component);

exports.default = Index;


Index.propTypes = {
  actions: _react.PropTypes.element,
  addControl: _react.PropTypes.node,
  attributes: _PropTypes2.default.attributes,
  emptyMessage: _react.PropTypes.string,
  emptyAddControl: _react.PropTypes.node,
  fill: _react.PropTypes.bool, // for Tiles
  filter: _react.PropTypes.object, // { name: [value, ...] }
  fixed: _react.PropTypes.bool,
  flush: _react.PropTypes.bool, // for Tiles
  itemComponent: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.shape({
    medium: _react.PropTypes.func,
    small: _react.PropTypes.func
  })]),
  label: _react.PropTypes.string,
  navControl: _react.PropTypes.node,
  notifications: _react.PropTypes.node,
  onFilter: _react.PropTypes.func, // (filter)
  onMore: _react.PropTypes.func,
  onQuery: _react.PropTypes.func, // (query)
  onSelect: _react.PropTypes.func,
  onSort: _react.PropTypes.func, // (sort)
  query: _react.PropTypes.object, // Query
  result: _PropTypes2.default.result,
  selection: _react.PropTypes.oneOfType([_react.PropTypes.string, // uri
  _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  sort: _react.PropTypes.string,
  view: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(["table", "tiles", "list"]), _react.PropTypes.shape({
    medium: _react.PropTypes.oneOf(["table", "tiles", "list"]),
    small: _react.PropTypes.oneOf(["table", "tiles", "list"])
  })])
};

Index.defaultProps = {
  attributes: [{ name: 'name', label: 'Name', index: 0 }],
  fixed: true,
  flush: true,
  view: "tiles"
};

Index.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];