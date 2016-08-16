// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import debounce from 'debounce';
import classnames from 'classnames';
import Header from 'grommet/components/Header';
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
      this.setState({ value: nextProps.query ? nextProps.query.toString() : '' });
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
        pad={{horizontal: 'medium', between: 'small'}}
        fixed={this.props.fixed} size="large">
        {this.props.navControl}
        <span className={`${CLASS_ROOT}__label`}>{this.props.label}</span>
        <Box className={`${CLASS_ROOT}__controls flex`} direction="row"
          align="center" justify="end" responsive={false}>
          <Search className={`${CLASS_ROOT}__search flex`}
            inline={true}
            placeHolder={placeHolder}
            value={this.state.value}
            onDOMChange={this._onChangeSearch} />
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
  sort: PropTypes.string
};

IndexHeader.contextTypes = {
  intl: PropTypes.object
};

IndexHeader.defaultProps = {
  filterDirection: 'column'
};
