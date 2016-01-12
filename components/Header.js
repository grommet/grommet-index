'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-header';

var IndexHeader = function (_Component) {
  _inherits(IndexHeader, _Component);

  function IndexHeader() {
    _classCallCheck(this, IndexHeader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexHeader).call(this));

    _this._onSearchChange = _this._onSearchChange.bind(_this);
    return _this;
  }

  _createClass(IndexHeader, [{
    key: '_onSearchChange',
    value: function _onSearchChange(text) {
      var query = this.props.query;
      if (query) {
        query.replaceTextTokens(text);
      } else {
        query = _Query2.default.create(text);
      }
      this.props.onQuery(query);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var searchText = '';
      if (this.props.query) {
        var query = this.props.query;
        if (typeof query === 'string') {
          searchText = query;
        } else {
          searchText = query.text;
        }
      }

      var outOfClasses = [CLASS_ROOT + "__out-of"];
      if (this.props.unfilteredTotal > this.props.total) {
        outOfClasses.push(CLASS_ROOT + "__out-of--active");
      }

      var filters;
      var numFilters = this.props.attributes.filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      }).length;
      if (numFilters > 0) {
        filters = _react2.default.createElement(_Filters2.default, { attributes: this.props.attributes,
          query: this.props.query,
          onQuery: this.props.onQuery });
      }

      return _react2.default.createElement(
        _Header2.default,
        { className: classes.join(' '),
          fixed: this.props.fixed, pad: 'medium', justify: 'between', size: 'large' },
        this.props.navControl,
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + "__title" },
          this.props.label
        ),
        _react2.default.createElement(_Search2.default, { className: CLASS_ROOT + "__search" + " flex",
          inline: true,
          placeHolder: 'Search',
          value: searchText,
          onChange: this._onSearchChange }),
        _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + "__controls", direction: 'row', responsive: false },
          filters,
          this.props.addControl,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__count" },
            this.props.result.total,
            _react2.default.createElement(
              'span',
              { className: outOfClasses.join(' ') },
              'out of ',
              this.props.result.unfilteredTotal
            )
          )
        )
      );
    }
  }]);

  return IndexHeader;
}(_react.Component);

exports.default = IndexHeader;

IndexHeader.propTypes = {
  //addControl: PropTypes.node,
  attributes: _PropTypes2.default.attributes.isRequired,
  fixed: _react.PropTypes.bool,
  label: _react.PropTypes.string.isRequired,
  navControl: _react.PropTypes.node,
  onQuery: _react.PropTypes.func.isRequired,
  query: _react.PropTypes.object,
  result: _PropTypes2.default.result
};

IndexHeader.defaultProps = {
  result: {}
};
module.exports = exports['default'];