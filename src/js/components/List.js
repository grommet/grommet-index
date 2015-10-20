// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var List = require('grommet/components/List');
var Attribute = require('./Attribute');
var IndexPropTypes = require('../utils/PropTypes');

var CLASS_ROOT = 'index-list';

var IndexList = React.createClass({

  propTypes: {
    attributes: IndexPropTypes.attributes,
    result: IndexPropTypes.result,
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onSelect: React.PropTypes.func
  },

  _onSelect: function (item) {
    this.props.onSelect(item.uri);
  },

  render: function () {
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
        schema.push({attribute: attribute.name, primary: true});
        havePrimary = true;
      } else if (! haveSecondary && attribute.secondary) {
        schema.push({attribute: attribute.name, secondary: true});
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
                item={item} attribute={{name: scheme.attribute}} />
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

});

module.exports = IndexList;
