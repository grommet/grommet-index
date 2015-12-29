// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLibUpdate = require('react/lib/update');

var _reactLibUpdate2 = _interopRequireDefault(_reactLibUpdate);

var _grommetComponentsMenu = require('grommet/components/Menu');

var _grommetComponentsMenu2 = _interopRequireDefault(_grommetComponentsMenu);

var _grommetComponentsIconsBaseFilter = require('grommet/components/icons/base/Filter');

var _grommetComponentsIconsBaseFilter2 = _interopRequireDefault(_grommetComponentsIconsBaseFilter);

var _grommetComponentsCheckBox = require('grommet/components/CheckBox');

var _grommetComponentsCheckBox2 = _interopRequireDefault(_grommetComponentsCheckBox);

var _grommetComponentsIconsStatus = require('grommet/components/icons/Status');

var _grommetComponentsIconsStatus2 = _interopRequireDefault(_grommetComponentsIconsStatus);

var _utilsPropTypes = require('../utils/PropTypes');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _utilsQuery = require('../utils/Query');

var _utilsQuery2 = _interopRequireDefault(_utilsQuery);

var CLASS_ROOT = "index-filters";

var BadgedFilterIcon = (function (_Component) {
  _inherits(BadgedFilterIcon, _Component);

  function BadgedFilterIcon() {
    _classCallCheck(this, BadgedFilterIcon);

    _get(Object.getPrototypeOf(BadgedFilterIcon.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(BadgedFilterIcon, [{
    key: 'render',
    value: function render() {
      var badge;
      if (this.props.label) {
        badge = _react2['default'].createElement(
          'svg',
          { className: 'badged-icon__badge', version: '1.1',
            width: '20px', height: '20px', viewBox: '0 0 20 20' },
          _react2['default'].createElement('circle', { stroke: 'none', cx: '10', cy: '10', r: '10' }),
          _react2['default'].createElement(
            'text',
            { x: '6.5', y: '15', fontSize: 16 },
            this.props.label
          )
        );
      }

      return _react2['default'].createElement(
        'span',
        { className: 'badged-icon' },
        _react2['default'].createElement(_grommetComponentsIconsBaseFilter2['default'], null),
        badge
      );
    }
  }]);

  return BadgedFilterIcon;
})(_react.Component);

BadgedFilterIcon.propTypes = {
  label: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

var Filters = (function (_Component2) {
  _inherits(Filters, _Component2);

  function Filters(props) {
    _classCallCheck(this, Filters);

    _get(Object.getPrototypeOf(Filters.prototype), 'constructor', this).call(this, props);

    this._onChange = this._onChange.bind(this);
    this._onChangeAll = this._onChangeAll.bind(this);

    this.state = this._stateFromProps(props);
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
        query = _utilsQuery2['default'].create('');
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

      var result = (0, _reactLibUpdate2['default'])(this.state, _defineProperty({}, attribute, (_attribute = {}, _defineProperty(_attribute, value, { $apply: function $apply(x) {
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
      var result = (0, _reactLibUpdate2['default'])(this.state, changes);
      this.setState(result, this._notify);
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var query = props.query || _utilsQuery2['default'].create('');
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
            label = _react2['default'].createElement(
              'span',
              null,
              _react2['default'].createElement(_grommetComponentsIconsStatus2['default'], { value: value, size: 'small' }),
              ' ',
              value
            );
          }
          return _react2['default'].createElement(_grommetComponentsCheckBox2['default'], { key: id, className: CLASS_ROOT + "__filter-value",
            id: id, label: label,
            checked: active,
            onChange: this._onChange.bind(this, attribute.name, value) });
        }, this);

        var components = [];
        components.push(_react2['default'].createElement(_grommetComponentsCheckBox2['default'], { key: attribute.name + '-all',
          className: CLASS_ROOT + "__filter-value",
          id: attribute.name + '-all',
          label: 'All',
          checked: this.state[attribute.name].all,
          onChange: this._onChangeAll.bind(this, attribute.name, attribute.filter) }));
        return _react2['default'].createElement(
          'fieldset',
          { key: attribute.name, className: CLASS_ROOT },
          _react2['default'].createElement(
            'legend',
            { className: CLASS_ROOT + "__filter-legend" },
            attribute.label
          ),
          components.concat(values)
        );
      }, this);

      var icon = _react2['default'].createElement(BadgedFilterIcon, { label: activeFilterCount || '' });

      return _react2['default'].createElement(
        _grommetComponentsMenu2['default'],
        { className: CLASS_ROOT + "__menu", icon: icon,
          dropAlign: { right: 'right' }, pad: 'medium',
          direction: 'column', closeOnClick: false },
        filters
      );
    }
  }]);

  return Filters;
})(_react.Component);

exports['default'] = Filters;

Filters.propTypes = {
  attributes: _utilsPropTypes2['default'].attributes.isRequired,
  query: _react.PropTypes.object,
  onQuery: _react.PropTypes.func
};
module.exports = exports['default'];