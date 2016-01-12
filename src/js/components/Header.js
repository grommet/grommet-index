// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import Box from 'grommet/components/Box';
import Filters from './Filters';
import IndexPropTypes from '../utils/PropTypes';
import IndexQuery from '../utils/Query';

const CLASS_ROOT = 'index-header';

export default class IndexHeader extends Component {

  constructor () {
    super();

    this._onSearchChange = this._onSearchChange.bind(this);
  }

  _onSearchChange (text) {
    var query = this.props.query;
    if (query) {
      query.replaceTextTokens(text);
    } else {
      query = IndexQuery.create(text);
    }
    this.props.onQuery(query);
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var searchText = '';
    if (this.props.query) {
      var query = this.props.query;
      if (typeof query === 'string') {
        searchText = query;
      } else {
        searchText = query.text;
      }
    }

    var outOfClasses = [CLASS_ROOT + "__out-of"];
    if (this.props.unfilteredTotal > this.props.total) {
      outOfClasses.push(CLASS_ROOT + "__out-of--active");
    }

    var filters;
    var numFilters = this.props.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .length;
    if (numFilters > 0) {
      filters = (
        <Filters attributes={this.props.attributes}
          query={this.props.query}
          onQuery={this.props.onQuery} />
      );
    }

    return (
      <Header className={classes.join(' ')}
        fixed={this.props.fixed} pad="medium" justify="between" size="large">
        {this.props.navControl}
        <span className={CLASS_ROOT + "__title"}>{this.props.label}</span>
        <Search className={CLASS_ROOT + "__search" + " flex"}
          inline={true}
          placeHolder="Search"
          value={searchText}
          onChange={this._onSearchChange} />
        <Box className={CLASS_ROOT + "__controls"} direction="row" responsive={false}>
          {filters}
          {this.props.addControl}
          <span className={CLASS_ROOT + "__count"}>
            {this.props.result.total}
            <span className={outOfClasses.join(' ')}>
              out of {this.props.result.unfilteredTotal}
            </span>
          </span>
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
