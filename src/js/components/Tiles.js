// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
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
    const { data, selection, sort } = this.props;
    const parts = sort.split(':');
    const attributeName = parts[0];
    const direction = parts[1];

    let sections = [];

    if (data.sections) {
      data.sections.forEach((section, i) => {
        const { actions, items, label } = section;
        const tiles = items.map(item => {
          return this._renderTile(item);
        });

        if (tiles.length > 0) {
          // only use onMore for last section
          let content = (
            <Tiles key={label}
              onMore={i === data.sections.length - 1 ? onMore : undefined}
              flush={this.props.flush} fill={this.props.fill}
              selectable={this.props.onSelect ? true : false}
              size={this.props.size}>
              {tiles}
            </Tiles>
          );

          sections.push(
            <div key={label} className={`${CLASS_ROOT}__section`}>
              <Header size="small" justify="between" responsive={false} separator="top" pad={{horizontal: 'small'}}>
                <label>{label}</label>
                {actions}
              </Header>
              {content}
            </div>
          );
        }
      });
    } else if (this.props.sections) {
      console.warn('Putting sections in attributes has been deprecated ' +
        'and will be removed in a future release. Sections should be ' +
        'part of the data object');

      let items = data.items.slice(0);

      this.props.sections.forEach((section) => {

        let selectionIndex = undefined;
        let sectionValue = section.value;
        if (sectionValue instanceof Date) {
          sectionValue = sectionValue.getTime();
        }
        let tiles = [];
        const actions = section.actions;

        while (items.length > 0) {
          const item = items[0];
          let itemValue = (item.hasOwnProperty(attributeName) ?
            item[attributeName] : item.attributes[attributeName]);
          if (itemValue instanceof Date) {
            itemValue = itemValue.getTime();
          }

          if (undefined === sectionValue ||
            ('asc' === direction && itemValue <= sectionValue) ||
            ('desc' === direction && itemValue >= sectionValue)) {
              // add it
            items.shift();
            if (selection && item.uri === selection) {
              selectionIndex = tiles.length;
            }
            tiles.push(this._renderTile(item));
          } else {
            // done
            break;
          }
        }

        if (tiles.length > 0) {
        // only use onMore for last section
          let content = (
            <Tiles key={section.label}
              onMore={items.length === 0 ? onMore : undefined}
              flush={this.props.flush} fill={this.props.fill}
              selectable={this.props.onSelect ? true : false}
              selected={selectionIndex}
              size={this.props.size}>
              {tiles}
            </Tiles>
          );

          let label;
          let justify = 'end';
          let header;

          if (sections.length !== 0 || items.length !== 0) {
            // more than one section, add label
            label = <label>{section.label}</label>;
            justify = 'between';
          }

          if (label || actions) {
            header = (
              <Header size="small" justify={justify} responsive={false} separator="top" pad={{horizontal: 'small'}}>
               {label}
               {actions}
              </Header>
            );
          }

          sections.push(
            <div key={section.label} className={`${CLASS_ROOT}__section`}>
              {header}
              {content}
            </div>
          );
        }
      });
    }

    return (
      <div className={classes.join(' ')}>
        {sections}
      </div>
    );
  }

  _renderTiles (classes, onMore) {
    const { data, selection, actions } = this.props;
    let tiles;
    let selectionIndex;
    let header;
    if (data && data.items.length) {
      tiles = data.items.map(function (item, index) {
        if (selection && item.uri === selection) {
          selectionIndex = index;
        }
        return this._renderTile(item);
      }, this);

      if (actions) {
        header = (
          <Header size="small" justify="end" responsive={false} pad={{horizontal: 'small'}}>
            {actions}
          </Header>
        );
      }
    }

    return (
      <div>
        {header}
        <Tiles className={classes.join(' ')} onMore={onMore}
          flush={this.props.flush} fill={this.props.fill}
          selectable={this.props.onSelect ? true : false}
          selected={selectionIndex}
          size={this.props.size}>
          {tiles}
        </Tiles>
      </div>
    );
  }

  render () {
    const { data, sort } = this.props;
    let classes = [CLASS_ROOT];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    let onMore;
    if (data && data.count < data.total) {
      onMore = this.props.onMore;
    }

    if ((data && data.sections)
      || (this.props.sections && sort && data && data.items)) {
      return this._renderSections(classes, onMore);
    } else {
      return this._renderTiles(classes, onMore);
    }
  }

}

IndexTiles.propTypes = {
  actions: PropTypes.element,
  attributes: IndexPropTypes.attributes,
  fill: PropTypes.bool,
  flush: PropTypes.bool,
  itemComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  onSelect: PropTypes.func,
  data: IndexPropTypes.data,
  sections: PropTypes.arrayOf(PropTypes.shape({
    actions: PropTypes.element,
    label: PropTypes.string,
    value: PropTypes.any
  })),
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
