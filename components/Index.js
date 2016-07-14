'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var CLASS_ROOT = 'index'; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var VIEW_COMPONENT = {
  list: _List2.default,
  tiles: _Tiles2.default,
  table: _Table2.default
};

var Index = function (_Component) {
  (0, _inherits3.default)(Index, _Component);

  function Index() {
    (0, _classCallCheck3.default)(this, Index);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Index).call(this));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this.state = { responsiveSize: 'medium' };
    return _this;
  }

  (0, _createClass3.default)(Index, [{
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
      var data = this.props.data;


      if (result) {
        console.warn('\'result\' prop has been renamed to \'data.\'' + ' Support for \'result\' will be removed in a future release.');
        data = result;
      }

      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var error = void 0;
      if (data && data.error) {
        error = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__error' },
          result.error
        );
      }

      var empty = void 0;
      if (data) {
        var emptyMessage = void 0;
        var addControl = void 0;
        if (data.unfilteredTotal === 0) {
          emptyMessage = this.props.emptyMessage;
          if (this.props.emptyAddControl) {
            addControl = this.props.emptyAddControl;
          } else {
            addControl = this.props.addControl;
          }
        } else if (data.total === 0) {
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
      if ((typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)) === 'object') {
        view = view[this.state.responsiveSize];
      }
      if ((typeof itemComponent === 'undefined' ? 'undefined' : (0, _typeof3.default)(itemComponent)) === 'object') {
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
            filterDirection: this.props.filterDirection,
            filter: this.props.filter, onFilter: this.props.onFilter,
            query: this.props.query, onQuery: this.props.onQuery,
            sort: this.props.sort, onSort: this.props.onSort,
            data: data,
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
              data: data,
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
  data: _PropTypes2.default.data,
  emptyMessage: _react.PropTypes.string,
  emptyAddControl: _react.PropTypes.node,
  fill: _react.PropTypes.bool, // for Tiles
  filter: _react.PropTypes.object, // { name: [value, ...] }
  filterDirection: _react.PropTypes.oneOf(['row', 'column']),
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
  filterDirection: 'column',
  fixed: true,
  flush: true,
  view: "tiles"
};

Index.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];