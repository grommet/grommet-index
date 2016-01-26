// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Menu from 'grommet/components/Menu';
import FilterIcon from 'grommet/components/icons/base/Filter';
import CheckBox from 'grommet/components/CheckBox';
import StatusIcon from 'grommet/components/icons/Status';
import IndexPropTypes from '../utils/PropTypes';
import IndexQuery from '../utils/Query';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = 'index-filters';

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
    let query;
    if (this.props.query) {
      query = this.props.query.clone();
    } else {
      query = IndexQuery.create('');
    }

    this.props.attributes
      .filter(attribute => attribute.hasOwnProperty('filter'))
      .forEach(attribute => {
        let attributeData = this.state[attribute.name];
        let activeValues = attribute.filter.filter(value => attributeData[value]);
        query.replaceAttributeValues(attribute.name, activeValues);
      });
    this.props.onQuery(query);
  }

  _onChange (attribute, value) {
    let result = update(this.state, {
      [attribute]: {
        [value]: { $apply: x => !x },
        all: { $set: false }
      }
    });
    this.setState(result, this._notify);
  }

  _onChangeAll (attribute, values) {
    let changes = {[attribute]: {all: { $set: true }}};
    values.forEach(value => {
      changes[attribute][value] = { $set: false };
    });
    let result = update(this.state, changes);
    this.setState(result, this._notify);
  }

  _stateFromProps (props) {
    let query = props.query || IndexQuery.create('');
    let state = {};
    props.attributes
      .filter(attribute => attribute.hasOwnProperty('filter'))
      .forEach(attribute => {
        let values = {};
        attribute.filter.forEach(value => {
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
    let activeFilterCount = 0;

    let filters = this.props.attributes
      .filter(attribute => attribute.hasOwnProperty('filter'))
      .map(attribute => {
        let values = attribute.filter.map(value => {
          let id = attribute.name + '-' + value;
          let active = this.state[attribute.name][value];
          if (active) {
            activeFilterCount += 1;
          }
          let label = value || '';
          if (attribute.name === 'status') {
            label = <span><StatusIcon value={value} size="small" /> {value}</span>;
          }
          return (
            <CheckBox key={id} className={`${CLASS_ROOT}__filter-value`}
              id={id} label={label}
              checked={active}
              onChange={this._onChange
                .bind(this, attribute.name, value)} />
          );
        });

        let components = [];
        let label = Intl.getMessage(this.context.intl, 'All');
        components.push(
          <CheckBox key={attribute.name + '-all'}
            className={`${CLASS_ROOT}__filter-value`}
            id={attribute.name + '-all'}
            label={label}
            checked={this.state[attribute.name].all}
            onChange={this._onChangeAll
              .bind(this, attribute.name, attribute.filter)} />
        );
        return (
          <fieldset key={attribute.name} className={CLASS_ROOT}>
            <legend className={`${CLASS_ROOT}__filter-legend`}>{attribute.label}</legend>
            {components.concat(values)}
          </fieldset>);
      });

    let icon = <FilterIcon colorIndex={activeFilterCount ? 'brand' : undefined} />;

    return (
      <Menu className={`${CLASS_ROOT}__menu`} icon={icon}
        dropAlign={{right: 'right'}} pad="medium" a11yTitle="Filter"
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

Filters.contextTypes = {
  intl: PropTypes.object
};
