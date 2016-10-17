// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-list';

class IndexListItem extends Component {

  render () {
    let { item, index, onClick, attributes } = this.props;
    let status, primary, secondary, separator;

    attributes.forEach(attribute => {
      const component =
        <Attribute key={attribute.name} item={item} attribute={attribute} />;
      if ('status' === attribute.name) {
        status = component;
      } else if (! primary) {
        primary = component;
      } else if (! secondary) {
        secondary = component;
      }
    });

    if (0 === index) {
      separator = 'horizontal';
    }

    return (
      <ListItem key={item.uri} className={CLASS_ROOT + '-item'}
        direction="row" responsive={false} separator={separator}
        pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}}
        onClick={onClick}>
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
    const { itemComponent } = this.props;
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickItem.bind(this, item.uri);
    }
    let listItem;
    if (itemComponent) {
      const Component = itemComponent;
      listItem = (
        <Component key={item.uri} item={item} index={index} onClick={onClick} />
      );
    } else {
      listItem = (
        <IndexListItem key={item.uri} item={item} index={index}
          onClick={onClick} attributes={this.props.attributes} />
      );
    }
    return listItem;
  }

  render () {
    const { data, selection } = this.props;
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let listItems;
    const multiSelected = Array.isArray(selection);
    let selectionIndex = multiSelected ? [] : undefined;
    if (data && data.items) {
      listItems = data.items.map((item, index) => {
        if (selection) {
          if (!multiSelected && item.uri === selection) {
            selectionIndex = index;
          } else if (multiSelected && selection.includes(item.uri)) {
            selectionIndex.push(index);
          }
        }
        return this._renderListItem(item, index);
      });
    }

    let onMore;
    if (data && data.count < data.total) {
      onMore = this.props.onMore;
    }

    let selectable = false;
    if (this.props.onSelect) {
      selectable = multiSelected ? 'multiple' : true;
    }

    return (
      <List className={classes.join(' ')}
        selectable={selectable}
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
  data: IndexPropTypes.data,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ])
};
