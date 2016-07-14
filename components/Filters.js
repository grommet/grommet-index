'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Filter = require('grommet/components/icons/base/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

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
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var attributes = _props2.attributes;
      var direction = _props2.direction;
      var inline = _props2.inline;
      var values = _props2.values;

      var classNames = [CLASS_ROOT];
      if (inline) {
        classNames.push(CLASS_ROOT + '--inline');
      }
      if (this.props.className) {
        classNames.push(this.props.className);
      }

      var filters = attributes.filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      }).map(function (attribute) {
        return _this3._renderFilter(attribute);
      });

      var sort = void 0;
      if (this.props.sort) {
        sort = this._renderSort();
      }

      var selectedFilterCount = (0, _keys2.default)(values).length;
      var icon = _react2.default.createElement(_Filter2.default, { colorIndex: selectedFilterCount ? 'brand' : undefined });

      var result = void 0;
      if (inline) {
        result = _react2.default.createElement(
          _Box2.default,
          { direction: direction, pad: { between: 'medium' },
            className: classNames.join(' ') },
          filters,
          sort
        );
      } else {
        classNames.push(CLASS_ROOT + '__drop');
        var a11yTitle = _Intl2.default.getMessage(this.context.intl, 'Filter');
        result = _react2.default.createElement(
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
        );
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