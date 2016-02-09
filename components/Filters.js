'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'index-filters';

var Filters = function (_Component) {
  _inherits(Filters, _Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Filters).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeSort = _this._onChangeSort.bind(_this);
    return _this;
  }

  _createClass(Filters, [{
    key: '_onChange',
    value: function _onChange(name, filterValues) {
      var values = _extends({}, this.props.values);
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
      var result = undefined;
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

      var sort = undefined;
      if (this.props.sort) {
        sort = this._renderSort();
      }

      var selectedFilterCount = Object.keys(values).length;
      var icon = _react2.default.createElement(_Filter2.default, { colorIndex: selectedFilterCount ? 'brand' : undefined });

      var result = undefined;
      if (inline) {
        result = _react2.default.createElement(
          _Box2.default,
          { direction: 'column', pad: { between: 'medium' },
            className: classNames.join(' ') },
          filters,
          sort
        );
      } else {
        classNames.push(CLASS_ROOT + '__drop');
        result = _react2.default.createElement(
          _Menu2.default,
          { className: CLASS_ROOT + "__menu", icon: icon,
            dropAlign: { right: 'right' }, a11yTitle: 'Filter',
            direction: 'column', closeOnClick: false },
          _react2.default.createElement(
            _Box2.default,
            { direction: 'column',
              pad: { horizontal: 'medium', vertical: 'medium', between: 'medium' },
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
  inline: _react.PropTypes.bool,
  onChange: _react.PropTypes.func, // (values)
  onSort: _react.PropTypes.func, // (sort)
  sort: _react.PropTypes.string, // name:asc|desc
  values: _react.PropTypes.object // name: [value, ...]
};

Filters.defaultProps = {
  values: {}
};

Filters.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];