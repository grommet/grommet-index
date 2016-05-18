// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import debounce from 'debounce';
import classnames from 'classnames';
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
    this._onChangeSearch = debounce(this._onChangeSearch.bind(this), 300);
  }

  _onChangeSearch (event) {
    this.props.onQuery(new IndexQuery(event.target.value));
  }

  render () {
    const { attributes, query } = this.props;
    const searchText = query ? query.toString() : '';
    const data = this.props.data || {};

    const classes = classnames(CLASS_ROOT, this.props.className);
    const countClasses = classnames(`${CLASS_ROOT}__count`, {
      [`${CLASS_ROOT}__count--active`]: data.unfilteredTotal > data.total
    });

    const filterOrSortAttributes = attributes.filter(a => a.filter || a.sort);

    let filters;
    if (filterOrSortAttributes.length > 0) {
      filters = (
        <div className={`${CLASS_ROOT}__filters no-flex`}>
          <Filters attributes={filterOrSortAttributes}
            direction={this.props.filterDirection}
            values={this.props.filter} sort={this.props.sort}
            onChange={this.props.onFilter}
            onSort={this.props.onSort} />
          <span className={`${CLASS_ROOT}__total`}>
            {data.unfilteredTotal}
          </span>
          <span className={countClasses}>
            {data.total}
          </span>
        </div>
      );
    }

    const placeHolder = Intl.getMessage(this.context.intl, 'Search');

    return (
      <Header className={classes}
        pad={{horizontal: 'medium', between: 'small'}}
        fixed={this.props.fixed} size="large">
        {this.props.navControl}
        <span className={`${CLASS_ROOT}__label`}>{this.props.label}</span>
        <Box className={`${CLASS_ROOT}__controls flex`} direction="row"
          align="center" justify="end" responsive={false}>
          <Search className={`${CLASS_ROOT}__search flex`}
            inline={true}
            placeHolder={placeHolder}
            defaultValue={searchText}
            onDOMChange={this._onChangeSearch} />
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
  filterDirection: PropTypes.oneOf(['row', 'column']),
  fixed: PropTypes.bool,
  label: PropTypes.string.isRequired,
  navControl: PropTypes.node,
  onFilter: PropTypes.func, // (filters)
  onQuery: PropTypes.func, // (query)
  onSort: PropTypes.func, // (sort)
  query: PropTypes.object, // Query
  data: IndexPropTypes.data,
  sort: PropTypes.string
};

IndexHeader.contextTypes = {
  intl: PropTypes.object,
  filterDirection: 'column'
};
