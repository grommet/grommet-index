// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var update =require('react/lib/update');
var Menu = require('grommet/components/Menu');
var FilterIcon = require('grommet/components/icons/base/Filter');
var CheckBox = require('grommet/components/CheckBox');
var IndexPropTypes = require('../utils/PropTypes');
var IndexQuery = require('../utils/Query');

var CLASS_ROOT = "index-filters";

var Filters = React.createClass({

  propTypes: {
    attributes: IndexPropTypes.attributes.isRequired,
    query: React.PropTypes.object,
    onQuery: React.PropTypes.func
  },

  getInitialState: function () {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  _notify: function () {
    var query;
    if (this.props.query) {
      query = this.props.query.clone();
    } else {
      query = IndexQuery.create('');
    }

    this.props.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .forEach(function (attribute) {
        var attributeData = this.state[attribute.name];
        var activeValues = attribute.filter.filter(function (value) {
          return attributeData[value];
        });
        query.replaceAttributeValues(attribute.name, activeValues);
      }, this);
    this.props.onQuery(query);
  },

  _onChange: function (attribute, value) {
    var result = update(this.state, {
      [attribute]: {
        [value]: { $apply: function(x) {
          return !x;
        } }
      },
      all: { $set: false }
    });
    this.setState(result, this._notify);
  },

  _onChangeAll: function (attribute, values) {
    var changes = {[attribute]: {all: { $set: true }}};
    values.forEach(function (value) {
      changes[attribute][value] = { $set: false };
    });
    var result = update(this.state, changes);
    this.setState(result, this._notify);
  },

  _stateFromProps: function (props) {
    var query = props.query || IndexQuery.create('');
    var state = {};
    props.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .forEach(function (attribute) {
        var values = {};
        attribute.filter.forEach(function (value) {
          values[value] =
            query.hasToken({attribute: attribute.name, value: value});
        });
        values.all =
          (query.attributeValues(attribute.name).length === 0);
        state[attribute.name] = values;
      });
    return state;
  },

  render: function() {
    var activeFilterCount = 0;

    var filters = this.props.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .map(function (attribute) {

        var values = attribute.filter.map(function (value) {
          var id = attribute.name + '-' + value;
          var active = this.state[attribute.name][value];
          if (active) {
            activeFilterCount += 1;
          }
          var label = value || '';
          return (
            <CheckBox key={id} className={CLASS_ROOT + "__filter-value"}
              id={id} label={label}
              checked={active}
              onChange={this._onChange
                .bind(this, attribute.name, value)} />
          );
        }, this);

        var components = [];
        components.push(
          <CheckBox key={attribute.name + '-all'}
            className={CLASS_ROOT + "__filter-value"}
            id={attribute.name + '-all'}
            label="All"
            checked={this.state[attribute.name].all}
            onChange={this._onChangeAll
              .bind(this, attribute.name, attribute.filter)} />
        );
        return (
          <fieldset key={attribute.name} className={CLASS_ROOT}>
            <legend className={CLASS_ROOT + "__filter-legend"}>{attribute.label}</legend>
            {components.concat(values)}
          </fieldset>);
      }, this);

    var icon = (<FilterIcon notifications={activeFilterCount} />);

    return (
      <Menu className={CLASS_ROOT + "__menu"} icon={icon}
        dropAlign={{right: 'right'}} pad="medium"
        direction="column" closeOnClick={false}>
        {filters}
      </Menu>
    );
  }

});

module.exports = Filters;
