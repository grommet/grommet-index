// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Table from 'grommet/components/Table';
import StatusIcon from 'grommet/components/icons/Status';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-table';

export default class IndexTable extends Component {

  constructor (props) {
    super(props);

    this._onClickRow = this._onClickRow.bind(this);

    this.state = {attributes: this._simplifyAttributes(props.attributes)};
  }

  componentWillReceiveProps (nextProps) {
    this.setState({attributes: this._simplifyAttributes(nextProps.attributes)});
  }

  _onClickRow (uri) {
    this.props.onSelect(uri);
  }

  _simplifyAttributes (attributes) {
    return attributes
      .filter(function (attribute) {
        return ! attribute.hidden;
      });
  }

  render () {
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

}

IndexTable.propTypes = {
  attributes: IndexPropTypes.attributes,
  result: IndexPropTypes.result,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onMore: PropTypes.func,
  onSelect: PropTypes.func
};
