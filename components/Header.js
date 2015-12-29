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

var _grommetComponentsHeader = require('grommet/components/Header');

var _grommetComponentsHeader2 = _interopRequireDefault(_grommetComponentsHeader);

var _grommetComponentsSearch = require('grommet/components/Search');

var _grommetComponentsSearch2 = _interopRequireDefault(_grommetComponentsSearch);

var _grommetComponentsBox = require('grommet/components/Box');

var _grommetComponentsBox2 = _interopRequireDefault(_grommetComponentsBox);

var _Filters = require('./Filters');

var _Filters2 = _interopRequireDefault(_Filters);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _utilsQuery = require('../utils/Query');

var _utilsQuery2 = _interopRequireDefault(_utilsQuery);

var CLASS_ROOT = 'index-header';

var IndexHeader = (function (_Component) {
  _inherits(IndexHeader, _Component);

  function IndexHeader() {
    _classCallCheck(this, IndexHeader);

    _get(Object.getPrototypeOf(IndexHeader.prototype), 'constructor', this).call(this);

    this._onSearchChange = this._onSearchChange.bind(this);
  }

  _createClass(IndexHeader, [{
    key: '_onSearchChange',
    value: function _onSearchChange(text) {
      var query = this.props.query;
      if (query) {
        query.replaceTextTokens(text);
      } else {
        query = _utilsQuery2['default'].create(text);
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
        filters = _react2['default'].createElement(_Filters2['default'], { attributes: this.props.attributes,
          query: this.props.query,
          onQuery: this.props.onQuery });
      }

      return _react2['default'].createElement(
        _grommetComponentsHeader2['default'],
        { className: classes.join(' '),
          fixed: this.props.fixed, pad: 'medium', justify: 'between', size: 'large' },
        this.props.navControl,
        _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__title" },
          this.props.label
        ),
        _react2['default'].createElement(_grommetComponentsSearch2['default'], { className: CLASS_ROOT + "__search" + " flex",
          inline: true,
          value: searchText,
          onChange: this._onSearchChange }),
        _react2['default'].createElement(
          _grommetComponentsBox2['default'],
          { className: CLASS_ROOT + "__controls", direction: 'row', responsive: false },
          filters,
          this.props.addControl,
          _react2['default'].createElement(
            'span',
            { className: CLASS_ROOT + "__count" },
            this.props.result.total,
            _react2['default'].createElement(
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
})(_react.Component);

exports['default'] = IndexHeader;

IndexHeader.propTypes = {
  //addControl: PropTypes.node,
  attributes: _utilsPropTypes2['default'].attributes.isRequired,
  fixed: _react.PropTypes.bool,
  label: _react.PropTypes.string.isRequired,
  navControl: _react.PropTypes.node,
  onQuery: _react.PropTypes.func.isRequired,
  query: _react.PropTypes.object,
  result: _utilsPropTypes2['default'].result
};

IndexHeader.defaultProps = {
  result: {}
};
module.exports = exports['default'];