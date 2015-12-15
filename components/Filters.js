// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var update = require('react/lib/update');
var Menu = require('grommet/components/Menu');
var FilterIcon = require('grommet/components/icons/base/Filter');
var CheckBox = require('grommet/components/CheckBox');
var StatusIcon = require('grommet/components/icons/Status');
var IndexPropTypes = require('../utils/PropTypes');
var IndexQuery = require('../utils/Query');

var CLASS_ROOT = "index-filters";

var BadgedFilterIcon = React.createClass({
  displayName: 'BadgedFilterIcon',

  propTypes: {
    label: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  render: function render() {
    var badge;
    if (this.props.label) {
      badge = React.createElement(
        'svg',
        { className: 'badged-icon__badge', version: '1.1',
          width: '20px', height: '20px', viewBox: '0 0 20 20' },
        React.createElement('circle', { stroke: 'none', cx: '10', cy: '10', r: '10' }),
        React.createElement(
          'text',
          { x: '6.5', y: '15', fontSize: 16 },
          this.props.label
        )
      );
    }

    return React.createElement(
      'span',
      { className: 'badged-icon' },
      React.createElement(FilterIcon, null),
      badge
    );
  }
});

var Filters = React.createClass({
  displayName: 'Filters',

  propTypes: {
    attributes: IndexPropTypes.attributes.isRequired,
    query: React.PropTypes.object,
    onQuery: React.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  _notify: function _notify() {
    var query;
    if (this.props.query) {
      query = this.props.query.clone();
    } else {
      query = IndexQuery.create('');
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
  },

  _onChange: function _onChange(attribute, value) {
    var _attribute;

    var result = update(this.state, _defineProperty({}, attribute, (_attribute = {}, _defineProperty(_attribute, value, { $apply: function $apply(x) {
        return !x;
      } }), _defineProperty(_attribute, 'all', { $set: false }), _attribute)));
    this.setState(result, this._notify);
  },

  _onChangeAll: function _onChangeAll(attribute, values) {
    var changes = _defineProperty({}, attribute, { all: { $set: true } });
    values.forEach(function (value) {
      changes[attribute][value] = { $set: false };
    });
    var result = update(this.state, changes);
    this.setState(result, this._notify);
  },

  _stateFromProps: function _stateFromProps(props) {
    var query = props.query || IndexQuery.create('');
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
  },

  render: function render() {
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
          label = React.createElement(
            'span',
            null,
            React.createElement(StatusIcon, { value: value, size: 'small' }),
            ' ',
            value
          );
        }
        return React.createElement(CheckBox, { key: id, className: CLASS_ROOT + "__filter-value",
          id: id, label: label,
          checked: active,
          onChange: this._onChange.bind(this, attribute.name, value) });
      }, this);

      var components = [];
      components.push(React.createElement(CheckBox, { key: attribute.name + '-all',
        className: CLASS_ROOT + "__filter-value",
        id: attribute.name + '-all',
        label: 'All',
        checked: this.state[attribute.name].all,
        onChange: this._onChangeAll.bind(this, attribute.name, attribute.filter) }));
      return React.createElement(
        'fieldset',
        { key: attribute.name, className: CLASS_ROOT },
        React.createElement(
          'legend',
          { className: CLASS_ROOT + "__filter-legend" },
          attribute.label
        ),
        components.concat(values)
      );
    }, this);

    var icon = React.createElement(BadgedFilterIcon, { label: activeFilterCount || '' });

    return React.createElement(
      Menu,
      { className: CLASS_ROOT + "__menu", icon: icon,
        dropAlign: { right: 'right' }, pad: 'medium',
        direction: 'column', closeOnClick: false },
      filters
    );
  }

});

module.exports = Filters;