// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexPropTypes = require('../utils/PropTypes');
var IndexTable = require('./IndexTable');
var IndexTiles = require('./IndexTiles');
var IndexList = require('./IndexList');
var IndexHeader = require('./IndexHeader');

var CLASS_ROOT = 'index';

var VIEW_COMPONENT = {
  list: IndexList,
  tiles: IndexTiles,
  table: IndexTable
};

var Index = React.createClass({

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
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    view: React.PropTypes.oneOf(["table", "tiles", "list"])
  },

  getDefaultProps: function () {
    return ({
      attributes: [{name: 'name', label: 'Name', index: 0}],
      flush: true,
      view: "tiles"
    });
  },

  _onQuery: function (query) {
    if (this.props.onQuery) {
      this.props.onQuery(query);
    }
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var error;
    if (this.props.result && this.props.result.error) {
      error = (
        <div className={CLASS_ROOT + "__error"}>
          {this.propr.result.error}
        </div>
      );
    }

    var ViewComponent = VIEW_COMPONENT[this.props.view];

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <IndexHeader className={CLASS_ROOT + "__header"}
            label={this.props.label}
            attributes={this.props.attributes}
            query={this.props.query}
            result={this.props.result}
            fixed={true}
            onQuery={this._onQuery}
            addControl={this.props.addControl}
            navControl={this.props.navControl} />
          {error}
          <div ref="items" className={CLASS_ROOT + "__items"}>
            <ViewComponent
              attributes={this.props.attributes}
              result={this.props.result}
              selection={this.props.selection}
              onSelect={this.props.onSelect}
              onMore={this.props.onMore} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Index;
