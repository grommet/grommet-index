// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import StatusIcon from 'grommet/components/icons/Status';
import Attribute from './Attribute';
import IndexPropTypes from '../utils/PropTypes';

const CLASS_ROOT = 'index-table';

class IndexTableRow extends Component {

  render () {
    let { item, selected, onClick, attributes } = this.props;

    let cells = attributes.map(function (attribute, index) {
      return (
        <td key={attribute.name}>
          <Attribute item={item} attribute={attribute} />
        </td>
      );
    }, this);

    return (
      <TableRow key={item.uri}
        onClick={onClick} selected={selected}>
        {cells}
      </TableRow>
    );
  }
}

IndexTableRow.propTypes = {
  attributes: IndexPropTypes.attributes,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

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

  _renderRow (item) {
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickRow.bind(this, item.uri);
    }
    let selected = false;
    if (this.props.selection && item.uri === this.props.selection) {
      selected = true;
    }
    let row;
    if (this.props.itemComponent) {
      row = (
        <this.props.itemComponent key={item.uri} item={item} onClick={onClick}
          selected={selected} />
      );
    } else {
      row = (
        <IndexTableRow key={item.uri} item={item} onClick={onClick}
          selected={selected} attributes={this.props.attributes} />
      );
    }
    return row;
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

    let rows;
    let selectionIndex;
    if (this.props.result && this.props.result.items) {
      rows = this.props.result.items.map(function (item, index) {
        if (this.props.selection && item.uri === this.props.selection) {
          selectionIndex = index;
        }
        return this._renderRow(item);
      }, this);
    }

    let onMore;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <Table className={classes.join(' ')}
        selectable={(this.props.onSelect || false)}
        scrollable={this.props.scrollable}
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
  scrollable: PropTypes.bool,
  onMore: PropTypes.func,
  onSelect: PropTypes.func
};

IndexTable.defaultProps = {
  scrollable: true
};
