// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Attribute = require('./Attribute');
var IndexPropTypes = require('../utils/PropTypes');

var CLASS_ROOT = 'index-tiles';

var IndexTiles = React.createClass({

  propTypes: {
    attributes: IndexPropTypes.attributes,
    result: IndexPropTypes.result,
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onSelect: React.PropTypes.func
  },

  _onClick: function (uri) {
    this.props.onSelect(uri);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var tiles = null;
    if (this.props.result && this.props.result.items) {
      tiles = this.props.result.items.map(function (item) {

        var headerValues = [];
        var values = [];
        var footerValues = [];

        this.props.attributes.forEach(function (attribute) {
          var value = (
            <Attribute key={attribute.name}
              item={item} attribute={attribute} />
          );
          if (attribute.header) {
            headerValues.push(value);
          } else if (attribute.footer) {
            footerValues.push(value);
          } else {
            values.push(value);
          }
        }, this);

        var header = null;
        if (headerValues.length > 0) {
          header = (
            <Header tag="h4" small={true} pad={{horizontal: 'small'}}>
              {headerValues}
            </Header>
          );
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
          <Tile key={item.uri}
            onClick={this._onClick.bind(this, item.uri)}
            selected={selected}>
            {header}
            {values}
            {footer}
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
      <Tiles className={classes.join(' ')} onMore={onMore} flush={false}>
        {tiles}
      </Tiles>
    );
  }

});

module.exports = IndexTiles;
