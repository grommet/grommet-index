// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-list';

class IndexListItem extends Component {

  render () {
    let { item, index, selected, onClick, attributes } = this.props;
    let status, primary, secondary, separator;

    attributes.forEach(attribute => {
      if ('status' === attribute.name) {
        status = <Attribute key={attribute.name} item={item} attribute={attribute} />;
      } else if (! primary) {
        primary = <Attribute key={attribute.name} className="flex" item={item} attribute={attribute} />;;
      } else if (! secondary) {
        secondary = <Attribute key={attribute.name} item={item} attribute={attribute} />;;
      }
    });

    if (0 === index) {
      separator = 'horizontal';
    }

    return (
      <ListItem key={item.uri} className={CLASS_ROOT + '-item'}
        direction="row" responsive={false} separator={separator}
        pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}}
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

  _renderListItem (item, index) {
    const { selection, itemComponent } = this.props;
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickItem.bind(this, item.uri);
    }
    let selected = false;
    if (selection && item.uri === selection) {
      selected = true;
    }
    let listItem;
    if (itemComponent) {
      const Component = itemComponent;
      listItem = (
        <Component key={item.uri} item={item} index={index} onClick={onClick}
          selected={selected} />
      );
    } else {
      listItem = (
        <IndexListItem key={item.uri} item={item} index={index} onClick={onClick}
          selected={selected} attributes={this.props.attributes} />
      );
    }
    return listItem;
  }

  render () {
    const { result, selection } = this.props;
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let listItems;
    let selectionIndex;
    if (result && result.items) {
      listItems = result.items.map((item, index) => {
        if (selection && item.uri === selection) {
          selectionIndex = index;
        }
        return this._renderListItem(item, index);
      });
    }

    let onMore;
    if (result && result.count < result.total) {
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
  itemComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  onSelect: PropTypes.func,
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ])
};
