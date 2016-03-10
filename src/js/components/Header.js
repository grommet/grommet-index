// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import Box from 'grommet/components/Box';
import Filters from './Filters';
import IndexPropTypes from '../utils/PropTypes';
import IndexQuery from '../utils/Query';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = 'index-header';

export default class IndexHeader extends Component {

  constructor () {
    super();
    this._onChangeSearch = this._onChangeSearch.bind(this);
  }

  _onChangeSearch (text) {
    this.props.onQuery(new IndexQuery(text));
  }

  render () {
    const { attributes, query } = this.props;
    const result = this.props.result || {};
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let searchText = '';
    if (query) {
      searchText = query.toString();
    }

    let countClasses = [`${CLASS_ROOT}__count`];
    if (result.unfilteredTotal > result.total) {
      countClasses.push(`${CLASS_ROOT}__count--active`);
    }

    let filters;
    const filterOrSortAttributes = attributes
      .filter(attribute => {
        return attribute.filter || attribute.sort;
      });
    if (filterOrSortAttributes.length > 0) {
      filters = (
        <div className={`${CLASS_ROOT}__filters no-flex`}>
          <Filters attributes={filterOrSortAttributes}
            values={this.props.filter} sort={this.props.sort}
            onChange={this.props.onFilter}
            onSort={this.props.onSort} />
          <span className={`${CLASS_ROOT}__total`}>
            {result.unfilteredTotal}
          </span>
          <span className={countClasses.join(' ')}>
            {result.total}
          </span>
        </div>
      );
    }

    let placeHolder = Intl.getMessage(this.context.intl, 'Search');

    return (
      <Header className={classes.join(' ')}
        pad={{horizontal: 'medium', between: 'small'}}
        fixed={this.props.fixed} size="large">
        {this.props.navControl}
        <span className={`${CLASS_ROOT}__label`}>{this.props.label}</span>
        <Box className={`${CLASS_ROOT}__controls flex`} direction="row"
          align="center" responsive={false}>
          <Search className={`${CLASS_ROOT}__search flex`}
            inline={true}
            placeHolder={placeHolder}
            value={searchText}
            onChange={this._onChangeSearch} />
          {filters}
          {this.props.addControl}
        </Box>
      </Header>
    );
  }

}

IndexHeader.propTypes = {
  addControl: PropTypes.node,
  attributes: IndexPropTypes.attributes.isRequired,
  filter: PropTypes.object, // { name: [value, ...] }
  fixed: PropTypes.bool,
  label: PropTypes.string.isRequired,
  navControl: PropTypes.node,
  onFilter: PropTypes.func, // (filters)
  onQuery: PropTypes.func, // (query)
  onSort: PropTypes.func, // (sort)
  query: PropTypes.object, // Query
  result: IndexPropTypes.result,
  sort: PropTypes.string
};

IndexHeader.contextTypes = {
  intl: PropTypes.object
};
