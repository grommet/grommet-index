'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Header = require('grommet/components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Search = require('grommet/components/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Query = require('../utils/Query');

var _Query2 = _interopRequireDefault(_Query);

var _Intl = require('grommet/utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = 'index-header'; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var IndexHeader = function (_Component) {
  (0, _inherits3.default)(IndexHeader, _Component);

  function IndexHeader() {
    (0, _classCallCheck3.default)(this, IndexHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndexHeader.__proto__ || (0, _getPrototypeOf2.default)(IndexHeader)).call(this));

    _this._onChangeSearch = _this._onChangeSearch.bind(_this);
    _this._onQuery = (0, _debounce2.default)(_this._onQuery.bind(_this), 300);
    _this.state = {
      value: ''
    };
    return _this;
  }

  (0, _createClass3.default)(IndexHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.query !== nextProps.query) {
        this.setState({ value: nextProps.query ? nextProps.query.toString() : '' });
      }
    }
  }, {
    key: '_onChangeSearch',
    value: function _onChangeSearch(event) {
      var value = event.target.value;
      this.setState({ value: value });
      this._onQuery(value);
    }
  }, {
    key: '_onQuery',
    value: function _onQuery(value) {
      this.props.onQuery(new _Query2.default(value));
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.props.attributes;


      var classes = (0, _classnames2.default)(CLASS_ROOT, this.props.className);

      var filterOrSortAttributes = attributes.filter(function (a) {
        return a.filter || a.sort;
      });

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
            value: this.state.value,
            onDOMChange: this._onChangeSearch }),
          this.props.addControl,
          filterOrSortAttributes.length > 0 && this.props.filterControl
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
  query: _react.PropTypes.instanceOf(_Query2.default), // instance of Query
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