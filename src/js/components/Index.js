// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Responsive from 'grommet/utils/Responsive';
import IndexPropTypes from '../utils/PropTypes';
import IndexTable from './Table';
import IndexTiles from './Tiles';
import IndexList from './List';
import IndexHeader from './Header';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = 'index';

const VIEW_COMPONENT = {
  list: IndexList,
  tiles: IndexTiles,
  table: IndexTable
};

export default class Index extends Component {

  constructor () {
    super();
    this._onResponsive = this._onResponsive.bind(this);
    this.state = { responsiveSize: 'medium' };
  }

  componentDidMount () {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount () {
    this._responsive.stop();
  }

  _onResponsive (small) {
    this.setState({ responsiveSize: (small ? 'small' : 'medium') });
  }

  render () {
    const { result, notifications } = this.props;
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let error;
    if (result && result.error) {
      error = (
        <div className={`${CLASS_ROOT}__error`}>
          {this.props.result.error}
        </div>
      );
    }

    let empty;
    if (result) {
      let emptyMessage;
      let addControl;
      if (result.unfilteredTotal === 0) {
        emptyMessage = this.props.emptyMessage;
        if (this.props.emptyAddControl) {
          addControl = this.props.emptyAddControl;
        } else {
          addControl = this.props.addControl;
        }
      } else if (result.total === 0) {
        emptyMessage = Intl.getMessage(this.context.intl, 'No matches');
      }
      if (emptyMessage) {
        empty = (
          <Box className={`${CLASS_ROOT}__empty`}
            pad={{horizontal: 'medium', vertical: 'large', between: 'medium'}}
            justify="center" align="center">
            <span className="secondary">{emptyMessage}</span>
            {addControl}
          </Box>
        );
      }
    }

    let view = this.props.view;
    let itemComponent = this.props.itemComponent;
    if (typeof view === 'object') {
      view = view[this.state.responsiveSize];
    }
    if (typeof itemComponent === 'object') {
      itemComponent = itemComponent[this.state.responsiveSize];
    }
    const ViewComponent = VIEW_COMPONENT[view];

    return (
      <div className={classes.join(' ')}>
        <div className={`${CLASS_ROOT}__container`}>
          <IndexHeader className={`${CLASS_ROOT}__header`}
            label={this.props.label}
            attributes={this.props.attributes}
            filter={this.props.filter} onFilter={this.props.onFilter}
            query={this.props.query} onQuery={this.props.onQuery}
            sort={this.props.sort} onSort={this.props.onSort}
            result={result}
            fixed={this.props.fixed}
            addControl={this.props.addControl}
            navControl={this.props.navControl} />
          {error}
          {notifications}
          <div ref="items" className={`${CLASS_ROOT}__items`}>
            <ViewComponent
              attributes={this.props.attributes}
              fill={this.props.fill}
              flush={this.props.flush}
              itemComponent={itemComponent}
              result={this.props.result}
              sections={this.props.sections}
              selection={this.props.selection}
              size={this.props.size}
              sort={this.props.sort}
              onSelect={this.props.onSelect}
              onMore={this.props.onMore} />
            {empty}
          </div>
        </div>
      </div>
    );
  }

}

Index.propTypes = {
  addControl: PropTypes.node,
  attributes: IndexPropTypes.attributes,
  emptyMessage: PropTypes.string,
  emptyAddControl: PropTypes.node,
  fill: PropTypes.bool, // for Tiles
  filter: PropTypes.object, // { name: [value, ...] }
  fixed: PropTypes.bool,
  flush: PropTypes.bool, // for Tiles
  itemComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      medium: PropTypes.func,
      small: PropTypes.func
    })
  ]),
  label: PropTypes.string,
  navControl: PropTypes.node,
  notifications: PropTypes.node,
  onFilter: PropTypes.func, // (filter)
  onMore: PropTypes.func,
  onQuery: PropTypes.func, // (query)
  onSelect: PropTypes.func,
  onSort: PropTypes.func, // (sort)
  query: PropTypes.object, // Query
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sort: PropTypes.string,
  view: PropTypes.oneOfType([
    PropTypes.oneOf(["table", "tiles", "list"]),
    PropTypes.shape({
      medium: PropTypes.oneOf(["table", "tiles", "list"]),
      small: PropTypes.oneOf(["table", "tiles", "list"])
    })
  ])
};

Index.defaultProps = {
  attributes: [{name: 'name', label: 'Name', index: 0}],
  fixed: true,
  flush: true,
  view: "tiles"
};

Index.contextTypes = {
  intl: PropTypes.object
};
