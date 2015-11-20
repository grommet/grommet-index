// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var Search = require('grommet/components/Search');
var Box = require('grommet/components/Box');
var Filters = require('./Filters');
var IndexPropTypes = require('../utils/PropTypes');
var IndexQuery = require('../utils/Query');

var CLASS_ROOT = 'index-header';

var IndexHeader = React.createClass({

  propTypes: {
    //addControl: React.PropTypes.node,
    attributes: IndexPropTypes.attributes.isRequired,
    fixed: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    navControl: React.PropTypes.node,
    onQuery: React.PropTypes.func.isRequired,
    query: React.PropTypes.object,
    result: IndexPropTypes.result
  },

  getDefaultProps: function () {
    return {
      result: {}
    };
  },

  _onSearchChange: function (text) {
    var query = this.props.query;
    if (query) {
      query.replaceTextTokens(text);
    } else {
      query = IndexQuery.create(text);
    }
    this.props.onQuery(query);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var searchText = '';
    if (this.props.query) {
      var query = this.props.query;
      if (typeof query === 'string') {
        searchText = query;
      } else {
        searchText = query.text;
      }
    }

    var outOfClasses = [CLASS_ROOT + "__out-of"];
    if (this.props.unfilteredTotal > this.props.total) {
      outOfClasses.push(CLASS_ROOT + "__out-of--active");
    }

    var filters = null;
    var numFilters = this.props.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .length;
    if (numFilters > 0) {
      filters = (
        <Filters attributes={this.props.attributes}
          query={this.props.query}
          onQuery={this.props.onQuery} />
      );
    }

    var addControl = null;
    if (this.props.addControl) {
      addControl = (
        <Menu className={CLASS_ROOT + "__add-control"}>
          {this.props.addControl}
        </Menu>
      );
    }

    var navControl = null;
    if (this.props.navControl) {
      navControl = this.props.navControl;
    }

    var label = this.props.label;

    return (
      <Header className={classes.join(' ')}
        fixed={this.props.fixed} pad="medium" justify="between" large={true}>
        {navControl}
        <span className={CLASS_ROOT + "__title"}>{label}</span>
        <Search className={CLASS_ROOT + "__search" + " flex"}
          inline={true}
          value={searchText}
          onChange={this._onSearchChange} />
        <Box direction="row" responsive={false}>
          {filters}
          {addControl}
          <span className={CLASS_ROOT + "__count"}>
            {this.props.result.total}
            <span className={outOfClasses.join(' ')}>
              out of {this.props.result.unfilteredTotal}
            </span>
          </span>
        </Box>
      </Header>
    );
  }

});

module.exports = IndexHeader;
