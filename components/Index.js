'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Split = require('grommet/components/Split');

var _Split2 = _interopRequireDefault(_Split);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Filter = require('grommet/components/icons/base/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

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

var _Filters = require('./Filters');

var _Filters2 = _interopRequireDefault(_Filters);

var _Intl = require('grommet/utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index';

var VIEW_COMPONENT = {
  list: _List2.default,
  tiles: _Tiles2.default,
  table: _Table2.default
};

var Index = function (_Component) {
  (0, _inherits3.default)(Index, _Component);

  function Index(props, context) {
    (0, _classCallCheck3.default)(this, Index);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Index).call(this, props, context));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._toggleInlineFilter = _this._toggleInlineFilter.bind(_this);
    _this.state = {
      responsiveSize: 'medium',
      inlineFilterOpen: props.inlineFilterParams && props.inlineFilterParams.defaultOpen
    };
    return _this;
  }

  (0, _createClass3.default)(Index, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._responsive = _Responsive2.default.start(this._onResponsive);

      if (this.props.onMore && this.props.footer) {
        console.warn('Using \'onMore\' and \'footer\' props together may cause unexpected behavior.' + 'Consider removing \'onMore\' functionality when a footer is present.');
      }
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
    key: '_toggleInlineFilter',
    value: function _toggleInlineFilter() {
      var inlineFilterParams = this.props.inlineFilterParams;

      var nextState = !this.state.inlineFilterOpen;

      this.setState({ inlineFilterOpen: nextState }, function () {
        return inlineFilterParams.onToggle && inlineFilterParams.onToggle(nextState);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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

      var filterControl = void 0;
      var filtersInline = this.props.filtersInline;
      var inlineFilterOpen = this.state.inlineFilterOpen;


      if (filtersInline) {
        filtersInline = filtersInline && this.state.responsiveSize !== 'small';
      }
      // mobile view doesn't get inline filter

      if (filtersInline && !inlineFilterOpen) {

        // only show the filterControl if the sidebar is closed
        var hasSelectedFilters = (0, _keys2.default)(this.props.filter).reduce(function (acc, key) {
          return _this2.props.filter[key].length > 0;
        }, false);
        var countClasses = (0, _classnames3.default)(CLASS_ROOT + '__count', (0, _defineProperty3.default)({}, CLASS_ROOT + '__count--active', data.unfilteredTotal > data.total));

        filterControl = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__filters no-flex' },
          _react2.default.createElement(_Button2.default, {
            icon: _react2.default.createElement(_Filter2.default, { colorIndex: hasSelectedFilters ? 'brand' : undefined }),
            plain: true,
            onClick: this._toggleInlineFilter }),
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__total' },
            data.unfilteredTotal
          ),
          _react2.default.createElement(
            'span',
            { className: countClasses },
            data.total
          )
        );
      } else if (!filtersInline) {
        filterControl = _react2.default.createElement(_Filters2.default, {
          attributes: this.props.attributes,
          data: data,
          values: this.props.filter,
          sort: this.props.sort,
          onChange: this.props.onFilter,
          onSort: this.props.onSort });
      }
      var preamble = void 0;
      if (this.props.preamble && this.state.responsiveSize !== 'small') {
        preamble = this.props.preamble;
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__container' },
          _react2.default.createElement(
            _Split2.default,
            { flex: 'left', priority: 'left', fixed: true },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Header2.default, { className: CLASS_ROOT + '__header',
                label: this.props.label,
                attributes: this.props.attributes,
                filterType: this.props.filterType,
                filterDirection: this.props.filterDirection,
                filter: this.props.filter, onFilter: this.props.onFilter,
                query: this.props.query, onQuery: this.props.onQuery,
                sort: this.props.sort, onSort: this.props.onSort,
                data: data,
                fixed: this.props.fixed,
                addControl: this.props.addControl,
                navControl: this.props.navControl,
                filterControl: filterControl }),
              preamble,
              error,
              notifications,
              _react2.default.createElement(
                _Box2.default,
                { pad: { between: 'medium' } },
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
                ),
                this.props.footer && _react2.default.createElement(
                  _Box2.default,
                  { separator: 'top' },
                  this.props.footer
                )
              )
            ),
            filtersInline && inlineFilterOpen && _react2.default.createElement(_Filters2.default, {
              inline: true,
              attributes: this.props.attributes,
              data: data,
              values: this.props.filter,
              sort: this.props.sort,
              onClose: this._toggleInlineFilter,
              onChange: this.props.onFilter,
              onSort: this.props.onSort })
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
  emptyMessage: _react.PropTypes.node,
  emptyAddControl: _react.PropTypes.node,
  fill: _react.PropTypes.bool, // for Tiles
  filter: _react.PropTypes.object, // { name: [value, ...] }
  filtersInline: _react.PropTypes.bool,
  filterDirection: _react.PropTypes.oneOf(['row', 'column']),
  fixed: _react.PropTypes.bool,
  flush: _react.PropTypes.bool, // for Tiles
  footer: _react.PropTypes.node,
  inlineFilterParams: _react.PropTypes.shape({
    onToggle: _react.PropTypes.func,
    defaultOpen: _react.PropTypes.bool
  }),
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
  preamble: _react.PropTypes.node,
  fixed: true,
  flush: true,
  view: "tiles"
};

Index.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];