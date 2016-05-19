'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Header = require('grommet/components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Search = require('grommet/components/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Filters = require('./Filters');

var _Filters2 = _interopRequireDefault(_Filters);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Query = require('../utils/Query');

var _Query2 = _interopRequireDefault(_Query);

var _Intl = require('grommet/utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-header';

var IndexHeader = function (_Component) {
  _inherits(IndexHeader, _Component);

  function IndexHeader() {
    _classCallCheck(this, IndexHeader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexHeader).call(this));

    _this._onChangeSearch = (0, _debounce2.default)(_this._onChangeSearch.bind(_this), 300);
    return _this;
  }

  _createClass(IndexHeader, [{
    key: '_onChangeSearch',
    value: function _onChangeSearch(event) {
      this.props.onQuery(new _Query2.default(event.target.value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var attributes = _props.attributes;
      var query = _props.query;

      var searchText = query ? query.toString() : '';
      var data = this.props.data || {};

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className);
      var countClasses = (0, _classnames3.default)(CLASS_ROOT + '__count', _defineProperty({}, CLASS_ROOT + '__count--active', data.unfilteredTotal > data.total));

      var filterOrSortAttributes = attributes.filter(function (a) {
        return a.filter || a.sort;
      });

      var filters = void 0;
      if (filterOrSortAttributes.length > 0) {
        filters = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__filters no-flex' },
          _react2.default.createElement(_Filters2.default, { attributes: filterOrSortAttributes,
            direction: this.props.filterDirection,
            values: this.props.filter, sort: this.props.sort,
            onChange: this.props.onFilter,
            onSort: this.props.onSort }),
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

      var placeHolder = _Intl2.default.getMessage(this.context.intl, 'Search');

      return _react2.default.createElement(
        _Header2.default,
        { className: classes,
          pad: { horizontal: 'medium', between: 'small' },
          fixed: this.props.fixed, size: 'large' },
        this.props.navControl,
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label' },
          this.props.label
        ),
        _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__controls flex', direction: 'row',
            align: 'center', justify: 'end', responsive: false },
          _react2.default.createElement(_Search2.default, { className: CLASS_ROOT + '__search flex',
            inline: true,
            placeHolder: placeHolder,
            defaultValue: searchText,
            onDOMChange: this._onChangeSearch }),
          filters,
          this.props.addControl
        )
      );
    }
  }]);

  return IndexHeader;
}(_react.Component);

exports.default = IndexHeader;


IndexHeader.propTypes = {
  addControl: _react.PropTypes.node,
  attributes: _PropTypes2.default.attributes.isRequired,
  filter: _react.PropTypes.object, // { name: [value, ...] }
  filterDirection: _react.PropTypes.oneOf(['row', 'column']),
  fixed: _react.PropTypes.bool,
  label: _react.PropTypes.string.isRequired,
  navControl: _react.PropTypes.node,
  onFilter: _react.PropTypes.func, // (filters)
  onQuery: _react.PropTypes.func, // (query)
  onSort: _react.PropTypes.func, // (sort)
  query: _react.PropTypes.object, // Query
  data: _PropTypes2.default.data,
  sort: _react.PropTypes.string
};

IndexHeader.contextTypes = {
  intl: _react.PropTypes.object
};

IndexHeader.defaultProps = {
  filterDirection: 'column'
};
module.exports = exports['default'];