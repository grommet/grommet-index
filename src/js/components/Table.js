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
    let { item, onClick, attributes } = this.props;

    let cells = attributes.map(function (attribute, index) {
      return (
        <td key={attribute.name}>
          <Attribute item={item} attribute={attribute} />
        </td>
      );
    }, this);

    return (
      <TableRow key={item.uri}
        onClick={onClick}>
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

  _simplifyAttributes (attributes) {
    let result;
    if (attributes) {
      result = attributes.filter(attribute => ! attribute.hidden);
    }
    return result;
  }

  _onClickRow (uri) {
    this.props.onSelect(uri);
  }

  _renderRow (item) {
    const { itemComponent } = this.props;
    let onClick;
    if (this.props.onSelect) {
      onClick = this._onClickRow.bind(this, item.uri);
    }
    let row;
    if (itemComponent) {
      const Component = itemComponent;
      row = (
        <Component key={item.uri} item={item} onClick={onClick} />
      );
    } else {
      row = (
        <IndexTableRow key={item.uri} item={item} onClick={onClick}
          attributes={this.props.attributes} />
      );
    }
    return row;
  }

  render () {
    const { data, selection } = this.props;
    const { attributes } = this.state;
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var header;
    if (attributes) {
      let headerCells = attributes.map(attribute => {
        let classes = [];
        if (attribute.secondary) {
          classes.push(`${CLASS_ROOT}__header--secondary`);
        }
        if (attribute.size) {
          classes.push(`${CLASS_ROOT}__header--${attribute.size}`);
        }

        let content = attribute.label;
        if ('status' === attribute.name) {
          classes.push(`${CLASS_ROOT}__cell--icon`);
          content = (
            <StatusIcon className={`${CLASS_ROOT}__header-icon`}
              value={'label'} small={true} />
          );
        }

        return (
          <th key={attribute.name} className={classes.join(' ')}>{content}</th>
        );
      }, this);

      header = (
        <thead><tr>{headerCells}</tr></thead>
      );
    }

    let rows;
    let multiSelected = Array.isArray(selection);
    let selectionIndex = multiSelected ? [] : null;
    if (data && data.items) {
      rows = data.items.map((item, index) => {
        if (selection) {
          if (!multiSelected && item.uri === selection) {
            selectionIndex = index;
          } else if (multiSelected && selection.includes(item.uri)) {
            selectionIndex.push(index);
          }
        }
        return this._renderRow(item);
      });
    }

    let onMore;
    if (data && data.count < data.total) {
      onMore = this.props.onMore;
    }

    let selectable = false;
    if (this.props.onSelect) {
      selectable = multiSelected ? 'multiple' : true;
    }

    return (
      <Table className={classes.join(' ')}
        selectable={selectable}
        scrollable={this.props.scrollable}
        selected={selectionIndex}
        onMore={onMore}>
        {header}
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}

IndexTable.propTypes = {
  attributes: IndexPropTypes.attributes,
  itemComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  data: IndexPropTypes.data,
  selection: PropTypes.oneOfType([
    PropTypes.string, // uri
    PropTypes.arrayOf(PropTypes.string)
  ]),
  scrollable: PropTypes.bool
};

IndexTable.defaultProps = {
  scrollable: true
};
