'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Sidebar = require('grommet/components/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Filter = require('grommet/components/icons/base/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _Header = require('grommet/components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Filter3 = require('./Filter');

var _Filter4 = _interopRequireDefault(_Filter3);

var _Sort = require('./Sort');

var _Sort2 = _interopRequireDefault(_Sort);

var _Intl = require('grommet/utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = 'index-filters'; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Filters = function (_Component) {
  (0, _inherits3.default)(Filters, _Component);

  function Filters(props) {
    (0, _classCallCheck3.default)(this, Filters);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Filters).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeSort = _this._onChangeSort.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Filters, [{
    key: '_onChange',
    value: function _onChange(name, filterValues) {
      var values = (0, _extends3.default)({}, this.props.values);
      values[name] = filterValues;
      this.props.onChange(values);
    }
  }, {
    key: '_onChangeSort',
    value: function _onChangeSort(value) {
      this.props.onSort(value);
    }
  }, {
    key: '_renderFilter',
    value: function _renderFilter(attribute) {
      var _this2 = this;

      var filter = attribute.filter;

      return _react2.default.createElement(_Filter4.default, { key: attribute.name, all: filter.all, inline: true,
        label: attribute.label, name: attribute.name,
        status: attribute.status, choices: filter.values,
        values: this.props.values[attribute.name],
        onChange: function onChange(values) {
          _this2._onChange(attribute.name, values);
        } });
    }
  }, {
    key: '_renderCounts',
    value: function _renderCounts() {
      var data = this.props.data;


      var countClasses = (0, _classnames3.default)(CLASS_ROOT + '__count', (0, _defineProperty3.default)({}, CLASS_ROOT + '__count--active', data.unfilteredTotal > data.total));

      return _react2.default.createElement(
        'div',
        null,
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
    }
  }, {
    key: '_renderSort',
    value: function _renderSort() {
      var _props = this.props;
      var attributes = _props.attributes;
      var sort = _props.sort;
      // prune to just attributes that we should sort

      var sortAttributes = attributes.filter(function (attribute) {
        return attribute.sort;
      });
      var result = void 0;
      if (sortAttributes.length > 0) {
        result = _react2.default.createElement(_Sort2.default, { attributes: sortAttributes, value: sort,
          onChange: this._onChangeSort });
      }
      return result;
    }
  }, {
    key: '_renderIcon',
    value: function _renderIcon() {
      var values = this.props.values;

      var hasSelectedFilters = (0, _keys2.default)(values).reduce(function (acc, key) {
        return values[key].length > 0;
      }, false);

      return _react2.default.createElement(_Filter2.default, { colorIndex: hasSelectedFilters ? 'brand' : undefined });
    }
  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var filters = _ref.filters;
      var sort = _ref.sort;
      var classNames = _ref.classNames;
      var _props2 = this.props;
      var data = _props2.data;
      var direction = _props2.direction;

      var a11yTitle = _Intl2.default.getMessage(this.context.intl, 'Filter');
      var icon = this._renderIcon();

      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__filters no-flex' },
        _react2.default.createElement(
          _Menu2.default,
          { className: CLASS_ROOT + "__menu", icon: icon,
            dropAlign: { right: 'right' }, a11yTitle: a11yTitle,
            direction: 'column', closeOnClick: false },
          _react2.default.createElement(
            _Box2.default,
            { direction: direction,
              pad: { horizontal: 'large', vertical: 'medium', between: 'medium' },
              className: classNames.join(' ') },
            filters,
            sort
          )
        ),
        data && this._renderCounts()
      );
    }
  }, {
    key: '_renderSidebar',
    value: function _renderSidebar(_ref2) {
      var filters = _ref2.filters;
      var sort = _ref2.sort;
      var classNames = _ref2.classNames;
      var direction = this.props.direction;

      var icon = this._renderIcon();

      return _react2.default.createElement(
        _Sidebar2.default,
        { colorIndex: 'light-2' },
        _react2.default.createElement(
          _Header2.default,
          { size: 'large', pad: { horizontal: 'medium' }, justify: 'between' },
          _Intl2.default.getMessage(this.context.intl, 'Filter by'),
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__filters no-flex' },
            _react2.default.createElement(_Button2.default, { icon: icon, plain: true, onClick: this.props.onClose }),
            this._renderCounts()
          )
        ),
        _react2.default.createElement(
          _Box2.default,
          {
            direction: direction,
            pad: { horizontal: 'large', vertical: 'medium', between: 'medium' },
            className: classNames.join(' ') },
          filters,
          sort
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props;
      var attributes = _props3.attributes;
      var inline = _props3.inline;

      var classNames = [CLASS_ROOT];
      if (inline) {
        classNames.push(CLASS_ROOT + '--inline');
      }
      if (this.props.className) {
        classNames.push(this.props.className);
      }

      var filterOrSortAttributes = attributes.filter(function (a) {
        return a.filter || a.sort;
      });

      var filters = attributes.filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      }).map(function (attribute) {
        return _this3._renderFilter(attribute);
      });

      var sort = void 0;
      if (this.props.sort) {
        sort = this._renderSort();
      }

      var result = void 0;
      if (filterOrSortAttributes.length > 0) {
        if (inline) {
          result = this._renderSidebar({ filters: filters, sort: sort, classNames: classNames });
        } else {
          result = this._renderMenu({ filters: filters, sort: sort, classNames: classNames });
        }
      }

      return result;
    }
  }]);
  return Filters;
}(_react.Component);

exports.default = Filters;


Filters.propTypes = {
  attributes: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    filter: _react.PropTypes.shape({
      all: _react.PropTypes.bool,
      values: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        label: _react.PropTypes.string,
        value: _react.PropTypes.string.isRequired
      })).isRequired
    }),
    label: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired,
    sort: _react.PropTypes.shape({
      direction: _react.PropTypes.string, // asc|desc
      sections: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        label: _react.PropTypes.string,
        value: _react.PropTypes.any
      }))
    }),
    status: _react.PropTypes.bool
  })).isRequired,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  inline: _react.PropTypes.bool,
  onChange: _react.PropTypes.func, // (values)
  onSort: _react.PropTypes.func, // (sort)
  sort: _react.PropTypes.string, // name:asc|desc
  values: _react.PropTypes.object // name: [value, ...]
};

Filters.defaultProps = {
  direction: "column",
  values: {}
};

Filters.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];