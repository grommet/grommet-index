// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-list';

class IndexListItem extends Component {

  render () {
    let { item, selected, onClick, attributes } = this.props;
    let status;
    let primary;
    let secondary;

    attributes.forEach(function (attribute) {
      if ('status' === attribute.name) {
        status = <Attribute key={attribute.name} item={item} attribute={attribute} />;
      } else if (! primary) {
        primary = <Attribute key={attribute.name} className="flex" item={item} attribute={attribute} />;;
      } else if (! secondary) {
        secondary = <Attribute key={attribute.name} item={item} attribute={attribute} />;;
      }
    }, this);

    return (
      <ListItem key={item.uri} className={CLASS_ROOT + '-item'}
        direction="row" responsive={false} pad={{between: 'medium'}}
        onClick={onClick} selected={selected}>
        {status}
        {primary}
        {secondary}
      </ListItem>
    );
  }
}

IndexListItem.propTypes = {
  attributes: IndexPropTypes.attributes,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default class IndexList extends Component {

  constructor () {
    super();
    this._onClickItem = this._onClickItem.bind(this);
  }

  _onClickItem (uri) {
    this.props.onSelect(uri);
  }

  _renderListItem (item) {
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickItem.bind(this, item.uri);
    }
    let selected = false;
    if (this.props.selection && item.uri === this.props.selection) {
      selected = true;
    }
    let listItem;
    if (this.props.itemComponent) {
      listItem = (
        <this.props.itemComponent key={item.uri} item={item} onClick={onClick}
          selected={selected} />
      );
    } else {
      listItem = (
        <IndexListItem key={item.uri} item={item} onClick={onClick}
          selected={selected} attributes={this.props.attributes} />
      );
    }
    return listItem;
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let listItems;
    let selectionIndex;
    if (this.props.result && this.props.result.items) {
      listItems = this.props.result.items.map(function (item, index) {
        if (this.props.selection && item.uri === this.props.selection) {
          selectionIndex = index;
        }
        return this._renderListItem(item);
      }, this);
    }

    let onMore;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <List className={classes.join(' ')}
        selectable={this.props.onSelect ? true : false}
        selected={selectionIndex}
        onMore={onMore} >
        {listItems}
      </List>
    );
  }
}

IndexList.propTypes = {
  attributes: IndexPropTypes.attributes,
  itemComponent: PropTypes.object,
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onSelect: PropTypes.func
};
