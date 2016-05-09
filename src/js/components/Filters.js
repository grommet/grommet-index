// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import FilterIcon from 'grommet/components/icons/base/Filter';
import Filter from './Filter';
import Sort from './Sort';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = 'index-filters';

export default class Filters extends Component {

  constructor (props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onChangeSort = this._onChangeSort.bind(this);
  }

  _onChange (name, filterValues) {
    let values = { ...this.props.values };
    values[name] = filterValues;
    this.props.onChange(values);
  }

  _onChangeSort (value) {
    this.props.onSort(value);
  }

  _renderFilter (attribute) {
    const { filter } = attribute;
    return (
      <Filter key={attribute.name} all={filter.all} inline={true}
        label={attribute.label} name={attribute.name}
        status={attribute.status} choices={filter.values}
        values={this.props.values[attribute.name]}
        onChange={values => {
          this._onChange(attribute.name, values);
        }} />
    );
  }

  _renderSort () {
    const { attributes, sort } = this.props;
    // prune to just attributes that we should sort
    const sortAttributes = attributes.filter(attribute => attribute.sort);
    let result;
    if (sortAttributes.length > 0) {
      result = (
        <Sort attributes={sortAttributes} value={sort}
          onChange={this._onChangeSort} />
      );
    }
    return result;
  }

  render () {
    const { direction, attributes, inline, values } = this.props;
    let classNames = [CLASS_ROOT];
    if (inline) {
      classNames.push(`${CLASS_ROOT}--inline`);
    }
    if (this.props.className) {
      classNames.push(this.props.className);
    }

    const filters = attributes
      .filter(attribute => attribute.hasOwnProperty('filter'))
      .map(attribute => this._renderFilter(attribute));

    let sort;
    if (this.props.sort) {
      sort = this._renderSort();
    }

    const selectedFilterCount = Object.keys(values).length;
    const icon = (
      <FilterIcon colorIndex={selectedFilterCount ? 'brand' : undefined} />
    );

    let result;
    if (inline) {
      result = (
        <Box direction={direction} pad={{between: 'medium'}}
          className={classNames.join(' ')}>
          {filters}
          {sort}
        </Box>
      );
    } else {
      classNames.push(`${CLASS_ROOT}__drop`);
      let a11yTitle = Intl.getMessage(this.context.intl, 'Filter');
      result = (
        <Menu className={CLASS_ROOT + "__menu"} icon={icon}
          dropAlign={{right: 'right'}} a11yTitle={a11yTitle}
          direction="column" closeOnClick={false}>
          <Box direction={direction}
            pad={{horizontal: 'large', vertical: 'medium', between: 'medium'}}
            className={classNames.join(' ')}>
            {filters}
            {sort}
          </Box>
        </Menu>
      );
    }

    return result;
  }

}

Filters.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    filter: PropTypes.shape({
      all: PropTypes.bool,
      values: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      })).isRequired
    }),
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    sort: PropTypes.shape({
      direction: PropTypes.string, // asc|desc
      sections: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
      }))
    }),
    status: PropTypes.bool
  })).isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  inline: PropTypes.bool,
  onChange: PropTypes.func, // (values)
  onSort: PropTypes.func, // (sort)
  sort: PropTypes.string, // name:asc|desc
  values: PropTypes.object // name: [value, ...]
};

Filters.defaultProps = {
  direction: "column",
  values: {}
};

Filters.contextTypes = {
  intl: PropTypes.object
};
