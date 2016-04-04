// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';
import BulkOperations from './BulkOperations';

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
        onClick={onClick} selected={selected}
        a11yTitle={`Open ${headerValues}`}>
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
    const { selection, itemComponent } = this.props;
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickTile.bind(this, item.uri);
    }
    let selected = false;
    if (selection && item.uri === selection) {
      selected = true;
    }
    let tile;
    if (itemComponent) {
      const Component = itemComponent;
      tile = (
        <Component key={item.uri} item={item} onClick={onClick}
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

  _renderSections (classes, onMore) {
    const { result, selection, sort, bulkOperationsComponent } = this.props;
    const parts = sort.split(':');
    const attributeName = parts[0];
    const direction = parts[1];
    let sections = [];
    let items = result.items.slice(0);
    this.props.sections.forEach((section) => {

      let selectionIndex = undefined;
      let sectionValue = section.value;
      if (sectionValue instanceof Date) {
        sectionValue = sectionValue.getTime();
      }
      let tiles = [];
      let sectionItems = [];

      while (items.length > 0) {
        const item = items[0];
        let itemValue = (item.hasOwnProperty(attributeName) ?
          item[attributeName] : item.attributes[attributeName]);
        if (itemValue instanceof Date) {
          itemValue = itemValue.getTime();
        }
        if (undefined === sectionValue ||
          ('asc' === direction && itemValue < sectionValue) ||
          ('desc' === direction && itemValue > sectionValue)) {
          // add it
          items.shift();
          if (selection && item.uri === selection) {
            selectionIndex = tiles.length;
          }
          sectionItems.push(item);
          tiles.push(this._renderTile(item));
        } else {
          // done
          break;
        }
      }

      if (tiles.length > 0) {
        // only use onMore for last section
        let sectionTiles = (
          <Tiles key={section.label}
            onMore={items.length === 0 ? onMore : undefined}
            flush={this.props.flush} fill={this.props.fill}
            selectable={this.props.onSelect ? true : false}
            selected={selectionIndex}
            size={this.props.size}>
            {tiles}
          </Tiles>
        );

        let bulkOperationsContent;
        let sectionContent = sectionTiles;

        if (bulkOperationsComponent) {
          bulkOperationsContent = <BulkOperations items={sectionItems} component={bulkOperationsComponent}/>;
          sectionContent = (
            <Box key={section.label} direction="row" pad={{between: 'small'}} responsive={false}>
              {sectionTiles}
              {bulkOperationsContent}
            </Box>
          );
        }

        if (sections.length !== 0 || items.length !== 0) {
          // more than one section, add label
          sections.push(
            <div key={section.label} className={`${CLASS_ROOT}__section`}>
              <label>{section.label}</label>
              {sectionContent}
            </div>
          );
        } else {
          sections.push(sectionContent);
        }
      }
    });

    return (
      <div className={classes.join(' ')}>
        {sections}
      </div>
    );
  }

  _renderTiles (classes, onMore) {
    const { result, selection, bulkOperationsComponent } = this.props;
    let tiles;
    let selectionIndex;
    if (result && result.items) {
      tiles = result.items.map(function (item, index) {
        if (selection && item.uri === selection) {
          selectionIndex = index;
        }
        return this._renderTile(item);
      }, this);
    }

    let bulkOperationsContent;

    if (bulkOperationsComponent) {
      bulkOperationsContent = <BulkOperations items={result.items} component={bulkOperationsComponent}/>;
    }

    return (
      <Box direction="row"  pad={{between: 'small'}}>
        <Tiles className={classes.join(' ')} onMore={onMore}
               flush={this.props.flush} fill={this.props.fill}
               selectable={this.props.onSelect ? true : false}
               selected={selectionIndex}
               size={this.props.size}>
          {tiles}
        </Tiles>
        {bulkOperationsContent}
      </Box>
    );
  }

  render () {
    const { result, sort } = this.props;
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let onMore;
    if (result && result.count < result.total) {
      onMore = this.props.onMore;
    }

    if (this.props.sections && sort && result && result.items) {
      return this._renderSections(classes, onMore);
    } else {
      return this._renderTiles(classes, onMore);
    }
  }

}

IndexTiles.propTypes = {
  attributes: IndexPropTypes.attributes,
  fill: PropTypes.bool,
  flush: PropTypes.bool,
  bulkOperationsComponent: PropTypes.func,
  itemComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  onSelect: PropTypes.func,
  result: IndexPropTypes.result,
  sections: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

