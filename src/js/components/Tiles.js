// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-tiles';

class IndexTile extends Component {

  render () {
    let { item, selected, onClick, attributes } = this.props;
    let statusValue;
    let headerValues = [];
    let values = [];
    let footerValues = [];

    attributes.forEach(function (attribute) {
      var value = (
        <Attribute key={attribute.name}
          item={item} attribute={attribute} />
      );
      if ('status' === attribute.name) {
        statusValue = value;
      } else if (attribute.header) {
        headerValues.push(value);
      } else if (attribute.footer) {
        footerValues.push(value);
      } else {
        values.push(value);
      }
    }, this);

    let header;
    if (headerValues.length > 0) {
      header = <h4>{headerValues}</h4>;
    }

    let footer;
    if (footerValues.length > 0) {
      footer = (
        <Footer small={true}>
          <span>{footerValues}</span>
        </Footer>
      );
    }

    return (
      <Tile key={item.uri} align="start"
        pad={{horizontal: "medium", vertical: "small"}}
        direction="row" responsive={false}
        onClick={onClick} selected={selected}>
        {statusValue}
        <Box key="contents" direction="column">
          {header}
          {values}
          {footer}
        </Box>
      </Tile>
    );
  }
}

IndexTile.propTypes = {
  attributes: IndexPropTypes.attributes,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default class IndexTiles extends Component {

  constructor () {
    super();
    this._onClickTile = this._onClickTile.bind(this);
  }

  _onClickTile (uri) {
    this.props.onSelect(uri);
  }

  _renderTile (item) {
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickTile.bind(this, item.uri);
    }
    let selected = false;
    if (this.props.selection && item.uri === this.props.selection) {
      selected = true;
    }
    let tile;
    if (this.props.itemComponent) {
      tile = (
        <this.props.itemComponent key={item.uri} item={item} onClick={onClick}
          selected={selected} />
      );
    } else {
      tile = (
        <IndexTile key={item.uri} item={item} onClick={onClick}
          selected={selected} attributes={this.props.attributes} />
      );
    }
    return tile;
  }

  render () {
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let tiles;
    let selectionIndex;
    if (this.props.result && this.props.result.items) {
      tiles = this.props.result.items.map(function (item, index) {
        if (this.props.selection && item.uri === this.props.selection) {
          selectionIndex = index;
        }
        return this._renderTile(item);
      }, this);
    }

    let onMore;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <Tiles className={classes.join(' ')} onMore={onMore}
        flush={this.props.flush} fill={this.props.fill}
        selectable={this.props.onSelect ? true : false}
        selected={selectionIndex}
        size={this.props.size}>
        {tiles}
      </Tiles>
    );
  }

}

IndexTiles.propTypes = {
  attributes: IndexPropTypes.attributes,
  fill: PropTypes.bool,
  flush: PropTypes.bool,
  itemComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onSelect: PropTypes.func
};
