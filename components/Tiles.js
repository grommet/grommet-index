// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Footer = require('grommet/components/Footer');
var Box = require('grommet/components/Box');
var Attribute = require('./Attribute');
var IndexPropTypes = require('../utils/PropTypes');

var CLASS_ROOT = 'index-tiles';

var IndexTiles = React.createClass({
  displayName: 'IndexTiles',

  propTypes: {
    attributes: IndexPropTypes.attributes,
    result: IndexPropTypes.result,
    selection: React.PropTypes.oneOfType([React.PropTypes.string, // uri
    React.PropTypes.arrayOf(React.PropTypes.string)]),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    onSelect: React.PropTypes.func
  },

  _onClick: function _onClick(uri) {
    this.props.onSelect(uri);
  },

  render: function render() {
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
          var value = React.createElement(Attribute, { key: attribute.name,
            item: item, attribute: attribute });
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
          header = React.createElement(
            'h4',
            null,
            headerValues
          );
        }

        var footer = null;
        if (footerValues.length > 0) {
          footer = React.createElement(
            Footer,
            { small: true },
            React.createElement(
              'span',
              null,
              footerValues
            )
          );
        }

        var selected = false;
        if (this.props.selection && item.uri === this.props.selection) {
          selected = true;
        }

        return React.createElement(
          Tile,
          { key: item.uri, align: 'start',
            pad: { horizontal: "medium", vertical: "small" },
            direction: 'row', responsive: false,
            onClick: this._onClick.bind(this, item.uri),
            selected: selected },
          statusValue,
          React.createElement(
            Box,
            { direction: 'column' },
            header,
            values,
            footer
          )
        );
      }, this);
    }

    var onMore = null;
    if (this.props.result && this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return React.createElement(
      Tiles,
      { className: classes.join(' '), onMore: onMore, flush: true,
        size: this.props.size },
      tiles
    );
  }

});

module.exports = IndexTiles;