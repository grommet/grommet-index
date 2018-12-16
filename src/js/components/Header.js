// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import classnames from 'classnames';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Box from 'grommet/components/Box';
import IndexPropTypes from '../utils/PropTypes';
import IndexQuery from '../utils/Query';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = 'index-header';

export default class IndexHeader extends Component {

  constructor () {
    super();
    this._onChangeSearch = this._onChangeSearch.bind(this);
    this._onQuery = debounce(this._onQuery.bind(this), 300);
    this.state = {
      value: ''
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.query !== nextProps.query) {
      this.setState({
        value: nextProps.query ? nextProps.query.toString() : ''
      });
    }
  }

  _onChangeSearch (event) {
    const value = event.target.value;
    this.setState({ value });
    this._onQuery(value);
  }

  _onQuery (value) {
    this.props.onQuery(new IndexQuery(value));
  }

  render () {
    const { attributes } = this.props;

    const classes = classnames(CLASS_ROOT, this.props.className);

    const filterOrSortAttributes = attributes.filter(a => a.filter || a.sort);

    const placeHolder = Intl.getMessage(this.context.intl, 'Search');

    return (
      <Header className={classes}
        pad={{ horizontal: 'medium' }}
        fixed={this.props.fixed} size="large">
        <Title responsive={false}>
          {this.props.navControl}
          <span>{this.props.label}</span>
        </Title>
        <Box direction="row" flex="grow" justify="end" align="center"
          responsive={false}>
          <Search className={`${CLASS_ROOT}__search`}
            inline={true} fill={true} size="medium"
            placeHolder={placeHolder}
            value={this.state.value}
            onDOMChange={this._onChangeSearch}
            suggestions={this.props.suggestions}
            onSelect={this.props.onSelect} />
          {this.props.addControl}
          {filterOrSortAttributes.length > 0 && this.props.filterControl}
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
  query: PropTypes.instanceOf(IndexQuery), // instance of Query
  data: IndexPropTypes.data,
  sort: PropTypes.string,
  suggestions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.any
      }),
      PropTypes.string
    ])
  ),
  onSelect: PropTypes.func
};

IndexHeader.contextTypes = {
  intl: PropTypes.object
};

IndexHeader.defaultProps = {
  filterDirection: 'column'
};
