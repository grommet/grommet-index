// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import IndexPropTypes from '../utils/PropTypes';
import IndexTable from './Table';
import IndexTiles from './Tiles';
import IndexList from './List';
import IndexHeader from './Header';

const CLASS_ROOT = 'index';

const VIEW_COMPONENT = {
  list: IndexList,
  tiles: IndexTiles,
  table: IndexTable
};

export default class Index extends Component {

  constructor () {
    super();

    this._onQuery = this._onQuery.bind(this);
  }

  _onQuery (query) {
    if (this.props.onQuery) {
      this.props.onQuery(query);
    }
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let error;
    if (this.props.result && this.props.result.error) {
      error = (
        <div className={CLASS_ROOT + "__error"}>
          {this.props.result.error}
        </div>
      );
    }

    const ViewComponent = VIEW_COMPONENT[this.props.view];

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <IndexHeader className={CLASS_ROOT + "__header"}
            label={this.props.label}
            attributes={this.props.attributes}
            query={this.props.query}
            result={this.props.result}
            fixed={true}
            onQuery={this._onQuery}
            addControl={this.props.addControl}
            navControl={this.props.navControl} />
          {error}
          <div ref="items" className={CLASS_ROOT + "__items"}>
            <ViewComponent
              attributes={this.props.attributes}
              itemComponent={this.props.itemComponent}
              result={this.props.result}
              selection={this.props.selection}
              size={this.props.size}
              onSelect={this.props.onSelect}
              onMore={this.props.onMore} />
          </div>
        </div>
      </div>
    );
  }

}

Index.propTypes = {
  addControl: PropTypes.node,
  attributes: IndexPropTypes.attributes,
  itemComponent: PropTypes.element,
  label: PropTypes.string,
  onMore: PropTypes.func,
  onQuery: PropTypes.func,
  onSelect: PropTypes.func,
  query: PropTypes.object,
  navControl: PropTypes.node,
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  view: PropTypes.oneOf(["table", "tiles", "list"])
};

Index.defaultProps = {
  attributes: [{name: 'name', label: 'Name', index: 0}],
  flush: true,
  view: "tiles"
};
