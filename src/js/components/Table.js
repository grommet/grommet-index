// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Table = require('grommet/components/Table');
var StatusIcon = require('grommet/components/icons/Status');
var Attribute = require('./Attribute');
var IndexPropTypes = require('../utils/PropTypes');

var CLASS_ROOT = 'index-table';

var IndexTable = React.createClass({

  propTypes: {
    attributes: IndexPropTypes.attributes,
    result: IndexPropTypes.result,
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onMore: React.PropTypes.func,
    onSelect: React.PropTypes.func
  },

  getInitialState: function () {
    return {attributes: this._simplifyAttributes(this.props.attributes)};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({attributes: this._simplifyAttributes(newProps.attributes)});
  },

  _onClickRow: function (uri) {
    this.props.onSelect(uri);
  },

  _simplifyAttributes: function (attributes) {
    return attributes
      .filter(function (attribute) {
        return ! attribute.hidden;
      });
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var attributes = this.state.attributes;

    var headerCells = attributes.map(function (attribute) {
      var classes = [];
      if (attribute.secondary) {
        classes.push(CLASS_ROOT + "__header--secondary");
      }
      if (attribute.size) {
        classes.push(CLASS_ROOT + "__header--" + attribute.size);
      }

      var content = attribute.label;
      if ('status' === attribute.name) {
        classes.push(CLASS_ROOT + "__cell--icon");
        content = (
          <StatusIcon className={CLASS_ROOT + "__header-icon"} value={'label'} small={true} />
        );
      }

      return (
        <th key={attribute.name} className={classes.join(' ')}>{content}</th>
      );
    }, this);

    var rows = null;
    var selectionIndex = null;
    if (this.props.result && this.props.result.items) {
      rows = this.props.result.items.map(function (item, index) {
        if (this.props.selection && item.uri === this.props.selection) {
          selectionIndex = index;
        }
        var cells = attributes.map(function (attribute) {
          return (
            <td key={attribute.name}>
              <Attribute item={item} attribute={attribute} />
            </td>
          );
        }, this);
        return (
          <tr key={item.uri} onClick={this._onClickRow.bind(this, item.uri)}>
            {cells}
          </tr>
        );
      }, this);
    }

    var onMore = null;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <Table className={classes.join(' ')}
        selectable={true}
        scrollable={true}
        selection={selectionIndex}
        onMore={onMore}>
        <thead><tr>{headerCells}</tr></thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

});

module.exports = IndexTable;
