'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _update2 = require('react/lib/update');

var _update3 = _interopRequireDefault(_update2);

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Filter = require('grommet/components/icons/base/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _CheckBox = require('grommet/components/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _Status = require('grommet/components/icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _PropTypes = require('../utils/PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _Query = require('../utils/Query');

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "index-filters";

var Filters = function (_Component) {
  _inherits(Filters, _Component);

  function Filters(props) {
    _classCallCheck(this, Filters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Filters).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeAll = _this._onChangeAll.bind(_this);

    _this.state = _this._stateFromProps(props);
    return _this;
  }

  _createClass(Filters, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this._stateFromProps(nextProps));
    }
  }, {
    key: '_notify',
    value: function _notify() {
      var query;
      if (this.props.query) {
        query = this.props.query.clone();
      } else {
        query = _Query2.default.create('');
      }

      this.props.attributes.filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      }).forEach(function (attribute) {
        var attributeData = this.state[attribute.name];
        var activeValues = attribute.filter.filter(function (value) {
          return attributeData[value];
        });
        query.replaceAttributeValues(attribute.name, activeValues);
      }, this);
      this.props.onQuery(query);
    }
  }, {
    key: '_onChange',
    value: function _onChange(attribute, value) {
      var _attribute;

      var result = (0, _update3.default)(this.state, _defineProperty({}, attribute, (_attribute = {}, _defineProperty(_attribute, value, { $apply: function $apply(x) {
          return !x;
        } }), _defineProperty(_attribute, 'all', { $set: false }), _attribute)));
      this.setState(result, this._notify);
    }
  }, {
    key: '_onChangeAll',
    value: function _onChangeAll(attribute, values) {
      var changes = _defineProperty({}, attribute, { all: { $set: true } });
      values.forEach(function (value) {
        changes[attribute][value] = { $set: false };
      });
      var result = (0, _update3.default)(this.state, changes);
      this.setState(result, this._notify);
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var query = props.query || _Query2.default.create('');
      var state = {};
      props.attributes.filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      }).forEach(function (attribute) {
        var values = {};
        attribute.filter.forEach(function (value) {
          values[value] = query.hasToken({ attribute: attribute.name, value: value });
        });
        values.all = query.attributeValues(attribute.name).length === 0;
        state[attribute.name] = values;
      });
      return state;
    }
  }, {
    key: 'render',
    value: function render() {
      var activeFilterCount = 0;

      var filters = this.props.attributes.filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      }).map(function (attribute) {

        var values = attribute.filter.map(function (value) {
          var id = attribute.name + '-' + value;
          var active = this.state[attribute.name][value];
          if (active) {
            activeFilterCount += 1;
          }
          var label = value || '';
          if (attribute.name === 'status') {
            label = _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_Status2.default, { value: value, size: 'small' }),
              ' ',
              value
            );
          }
          return _react2.default.createElement(_CheckBox2.default, { key: id, className: CLASS_ROOT + "__filter-value",
            id: id, label: label,
            checked: active,
            onChange: this._onChange.bind(this, attribute.name, value) });
        }, this);

        var components = [];
        components.push(_react2.default.createElement(_CheckBox2.default, { key: attribute.name + '-all',
          className: CLASS_ROOT + "__filter-value",
          id: attribute.name + '-all',
          label: 'All',
          checked: this.state[attribute.name].all,
          onChange: this._onChangeAll.bind(this, attribute.name, attribute.filter) }));
        return _react2.default.createElement(
          'fieldset',
          { key: attribute.name, className: CLASS_ROOT },
          _react2.default.createElement(
            'legend',
            { className: CLASS_ROOT + "__filter-legend" },
            attribute.label
          ),
          components.concat(values)
        );
      }, this);

      var icon = _react2.default.createElement(_Filter2.default, { colorIndex: activeFilterCount ? 'brand' : undefined });

      return _react2.default.createElement(
        _Menu2.default,
        { className: CLASS_ROOT + "__menu", icon: icon,
          dropAlign: { right: 'right' }, pad: 'medium', a11yTitle: 'Filter',
          direction: 'column', closeOnClick: false },
        filters
      );
    }
  }]);

  return Filters;
}(_react.Component);

exports.default = Filters;

Filters.propTypes = {
  attributes: _PropTypes2.default.attributes.isRequired,
  query: _react.PropTypes.object,
  onQuery: _react.PropTypes.func
};
module.exports = exports['default'];