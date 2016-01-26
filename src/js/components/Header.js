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

    this._onSearchChange = this._onSearchChange.bind(this);
  }

  _onSearchChange (text) {
    let query = this.props.query;
    if (query) {
      query.replaceTextTokens(text);
    } else {
      query = IndexQuery.create(text);
    }
    this.props.onQuery(query);
  }

  render () {
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let searchText = '';
    if (this.props.query) {
      let query = this.props.query;
      if (typeof query === 'string') {
        searchText = query;
      } else {
        searchText = query.text;
      }
    }

    let countClasses = [`${CLASS_ROOT}__count`];
    if (this.props.result.unfilteredTotal > this.props.result.total) {
      countClasses.push(`${CLASS_ROOT}__count--active`);
    }

    let filters;
    let numFilters = this.props.attributes
      .filter(attribute => attribute.hasOwnProperty('filter'))
      .length;
    if (numFilters > 0) {
      filters = [
        <Filters key="filters" attributes={this.props.attributes}
          query={this.props.query}
          onQuery={this.props.onQuery} />,
        <span key="total" className={`${CLASS_ROOT}__total`}>
          {this.props.result.unfilteredTotal}
        </span>,
        <span key="count" className={countClasses.join(' ')}>
          {this.props.result.total}
        </span>
      ];
    }

    let placeHolder = Intl.getMessage(this.context.intl, 'Search');

    return (
      <Header className={classes.join(' ')}
        fixed={this.props.fixed} pad="medium" justify="between" size="large">
        {this.props.navControl}
        <span className={`${CLASS_ROOT}__title`}>{this.props.label}</span>
        <Search className={`${CLASS_ROOT}__search flex`}
          inline={true}
          placeHolder={placeHolder}
          value={searchText}
          onChange={this._onSearchChange} />
        <Box className={`${CLASS_ROOT}__controls`} direction="row" responsive={false}>
          {filters}
          {this.props.addControl}
        </Box>
      </Header>
    );
  }

}

IndexHeader.propTypes = {
  //addControl: PropTypes.node,
  attributes: IndexPropTypes.attributes.isRequired,
  fixed: PropTypes.bool,
  label: PropTypes.string.isRequired,
  navControl: PropTypes.node,
  onQuery: PropTypes.func.isRequired,
  query: PropTypes.object,
  result: IndexPropTypes.result
};

IndexHeader.defaultProps = {
  result: {}
};

IndexHeader.contextTypes = {
  intl: PropTypes.object
};
