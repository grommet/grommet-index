// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import List from 'grommet/components/List';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-list';

export default class IndexList extends Component {

  constructor () {
    super();

    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect (item) {
    this.props.onSelect(item.uri);
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    // build List scheme from attributes
    var schema = [{attribute: 'uri', uid: true}];
    var havePrimary = false;
    var haveSecondary = false;
    this.props.attributes.forEach(function (attribute) {
      if ('status' === attribute.name) {
        schema.push({attribute: 'status', image: true});
      } else if (! havePrimary) {
        schema.push({attribute: attribute.name, primary: true,
          '_timestamp': attribute.timestamp});
        havePrimary = true;
      } else if (! haveSecondary && attribute.secondary) {
        schema.push({attribute: attribute.name, secondary: true,
          '_timestamp': attribute.timestamp});
        haveSecondary = true;
      }
    });

    var data = [];
    if (this.props.result && this.props.result.items) {
      data = this.props.result.items.map(function (item) {
        var dataItem = {uri: item.uri};

        schema.forEach(function (scheme) {
          if (! scheme.uid) {
            dataItem[scheme.attribute] = (
              <Attribute key={scheme.attribute}
                item={item}
                attribute={{name: scheme.attribute, timestamp: scheme._timestamp}} />
            );
          }
        }, this);

        return dataItem;
      }, this);
    }

    var onMore = null;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <List className={classes.join(' ')}
        schema={schema} data={data} selected={this.props.selection}
        onMore={onMore} onSelect={this._onSelect} />
    );
  }

}

IndexList.propTypes = {
  attributes: IndexPropTypes.attributes,
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onSelect: PropTypes.func
};
