// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Menu from 'grommet/components/Menu';
import FilterIcon from 'grommet/components/icons/base/Filter';
import CheckBox from 'grommet/components/CheckBox';
import StatusIcon from 'grommet/components/icons/Status';
import IndexPropTypes from '../utils/PropTypes';
import IndexQuery from '../utils/Query';

const CLASS_ROOT = "index-filters";

class BadgedFilterIcon extends Component {

  render () {
    var badge;
    if (this.props.label) {
      badge = (
        <svg className="badged-icon__badge" version="1.1"
          width="20px" height="20px" viewBox="0 0 20 20">
          <circle stroke="none" cx="10" cy="10" r="10"/>
          <text x="6.5" y="15" fontSize={16}>{this.props.label}</text>
        </svg>
      );
    }

    return (
      <span className="badged-icon">
        <FilterIcon />
        {badge}
      </span>
    );
  }
}

BadgedFilterIcon.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default class Filters extends Component {

  constructor (props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onChangeAll = this._onChangeAll.bind(this);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _notify () {
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
  }

  _onChange (attribute, value) {
    var result = update(this.state, {
      [attribute]: {
        [value]: { $apply: function(x) {
          return !x;
        } },
        all: { $set: false }
      }
    });
    this.setState(result, this._notify);
  }

  _onChangeAll (attribute, values) {
    var changes = {[attribute]: {all: { $set: true }}};
    values.forEach(function (value) {
      changes[attribute][value] = { $set: false };
    });
    var result = update(this.state, changes);
    this.setState(result, this._notify);
  }

  _stateFromProps (props) {
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
  }

  render () {
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
          if (attribute.name === 'status') {
            label = <span><StatusIcon value={value} size="small"/> {value}</span>;
          }
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

    var icon = (<BadgedFilterIcon label={activeFilterCount || ''} />);

    return (
      <Menu className={CLASS_ROOT + "__menu"} icon={icon}
        dropAlign={{right: 'right'}} pad="medium"
        direction="column" closeOnClick={false}>
        {filters}
      </Menu>
    );
  }

}

Filters.propTypes = {
  attributes: IndexPropTypes.attributes.isRequired,
  query: PropTypes.object,
  onQuery: PropTypes.func
};
