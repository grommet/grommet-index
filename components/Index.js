// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var IndexPropTypes = require('../utils/PropTypes');
var IndexTable = require('./Table');
var IndexTiles = require('./Tiles');
var IndexList = require('./List');
var IndexHeader = require('./Header');

var CLASS_ROOT = 'index';

var VIEW_COMPONENT = {
  list: IndexList,
  tiles: IndexTiles,
  table: IndexTable
};

var Index = React.createClass({
  displayName: 'Index',

  propTypes: {
    addControl: React.PropTypes.node,
    attributes: IndexPropTypes.attributes,
    label: React.PropTypes.string,
    onMore: React.PropTypes.func,
    onQuery: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    query: React.PropTypes.object,
    navControl: React.PropTypes.node,
    result: IndexPropTypes.result,
    selection: React.PropTypes.oneOfType([React.PropTypes.string, // uri
    React.PropTypes.arrayOf(React.PropTypes.string)]),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    view: React.PropTypes.oneOf(["table", "tiles", "list"])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      attributes: [{ name: 'name', label: 'Name', index: 0 }],
      flush: true,
      view: "tiles"
    };
  },

  _onQuery: function _onQuery(query) {
    if (this.props.onQuery) {
      this.props.onQuery(query);
    }
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var error;
    if (this.props.result && this.props.result.error) {
      error = React.createElement(
        'div',
        { className: CLASS_ROOT + "__error" },
        this.props.result.error
      );
    }

    var ViewComponent = VIEW_COMPONENT[this.props.view];

    return React.createElement(
      'div',
      { className: classes.join(' ') },
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__container" },
        React.createElement(IndexHeader, { className: CLASS_ROOT + "__header",
          label: this.props.label,
          attributes: this.props.attributes,
          query: this.props.query,
          result: this.props.result,
          fixed: true,
          onQuery: this._onQuery,
          addControl: this.props.addControl,
          navControl: this.props.navControl }),
        error,
        React.createElement(
          'div',
          { ref: 'items', className: CLASS_ROOT + "__items" },
          React.createElement(ViewComponent, {
            attributes: this.props.attributes,
            result: this.props.result,
            selection: this.props.selection,
            size: this.props.size,
            onSelect: this.props.onSelect,
            onMore: this.props.onMore })
        )
      )
    );
  }

});

module.exports = Index;