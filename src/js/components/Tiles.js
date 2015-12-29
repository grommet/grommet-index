// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-tiles';

export default class IndexTiles extends Component {

  constructor () {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _onClick (uri) {
    this.props.onSelect(uri);
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var tiles = null;
    if (this.props.result && this.props.result.items) {
      tiles = this.props.result.items.map(function (item) {

        var statusValue;
        var headerValues = [];
        var values = [];
        var footerValues = [];

        this.props.attributes.forEach(function (attribute) {
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

        var header = null;
        if (headerValues.length > 0) {
          header = <h4>{headerValues}</h4>;
        }

        var footer = null;
        if (footerValues.length > 0) {
          footer = (
            <Footer small={true}>
              <span>{footerValues}</span>
            </Footer>
          );
        }

        var selected = false;
        if (this.props.selection && item.uri === this.props.selection) {
          selected = true;
        }

        return (
          <Tile key={item.uri} align="start"
            pad={{horizontal: "medium", vertical: "small"}}
            direction="row" responsive={false}
            onClick={this._onClick.bind(this, item.uri)}
            selected={selected}>
            {statusValue}
            <Box direction="column">
              {header}
              {values}
              {footer}
            </Box>
          </Tile>
        );
      }, this);
    }

    var onMore = null;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <Tiles className={classes.join(' ')} onMore={onMore} flush={true}
        size={this.props.size}>
        {tiles}
      </Tiles>
    );
  }

}

IndexTiles.propTypes = {
  attributes: IndexPropTypes.attributes,
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onSelect: PropTypes.func
};
