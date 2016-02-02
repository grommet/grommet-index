// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import CheckBox from 'grommet/components/CheckBox';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import StatusIcon from 'grommet/components/icons/Status';
import CaretDownIcon from 'grommet/components/icons/base/CaretDown';
import CaretUpIcon from 'grommet/components/icons/base/CaretUp';

const CLASS_ROOT = "index-filter";

export default class Filter extends Component {

  constructor (props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onChangeAll = this._onChangeAll.bind(this);
    this._onToggleActive = this._onToggleActive.bind(this);

    this.state = {};
  }

  _onChange (value) {
    let values = this.props.values.slice(0);
    const index = values.indexOf(value);
    if (-1 === index) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    this.props.onChange(values);
  }

  _onChangeAll () {
    this.props.onChange([]);
  }

  _onToggleActive (event) {
    event.preventDefault();
    this.setState({ active: ! this.state.active });
  }

  _renderChoices () {
    const { name, values, choices, all, status } = this.props;
    let checkBoxes = choices.map(choice => {
      const id = `${name}-${choice.value}`;
      const checked = (-1 !== values.indexOf(choice.value));
      let label = choice.label || choice.value || '';
      if (status) {
        label = (
          <span>
            <StatusIcon value={choice.value} size="small"/> {label}
          </span>
        );
      }
      return (
        <CheckBox key={id} className={`${CLASS_ROOT}__choice`}
          id={id} label={label} checked={checked}
          onChange={this._onChange.bind(this, choice.value)} />
      );
    });

    if (all) {
      checkBoxes.unshift(
        <CheckBox key={`${name}-all`} className={`${CLASS_ROOT}__choice`}
          id={`${name}-all`} label="All" checked={values.length === 0}
          onChange={this._onChangeAll} />
      );
    }
    return (
      <Box direction="column" pad={{between: 'small'}}
        className={`${CLASS_ROOT}__choices`}>
        {checkBoxes}
      </Box>
    );
  }

  _renderSummary () {
    const { values, choices, all } = this.props;
    let summary;
    if (values.length === 0) {
      if (all) {
        summary = 'All';
      }
    } else if (values.length === 1) {
      summary = choices
        .filter(choice => values.indexOf(choice.value) !== -1)
        .map(choice => choice.label);
    } else {
      summary = `${values.length} values`;
    }
    return <span className={`${CLASS_ROOT}__summary secondary`}>{summary}</span>;
  }

  render () {
    const { label, inline } = this.props;
    var other = pick(this.props, keys(Box.propTypes));
    let classNames = [CLASS_ROOT];

    let header = <h3 className={`${CLASS_ROOT}__label`}>{label}</h3>;

    if (inline) {
      classNames.push(`${CLASS_ROOT}--inline`);
    } else {

      let summary = this._renderSummary();
      let icon;
      if (this.state.active) {
        classNames.push(`${CLASS_ROOT}--active`);
        icon = <CaretUpIcon />;
      } else {
        icon = <CaretDownIcon />;
      }

      header = (
        <Header className={`${CLASS_ROOT}__header`}
          justify="between" align="center" onClick={this._onToggleActive}>
          <div>
            {header}
            {summary}
          </div>
          <Button type="icon" onClick={this._onToggleActive}>
            {icon}
          </Button>
        </Header>
      );
    }

    const choices = this._renderChoices();

    return (
      <Box {...other} className={classNames.join(' ')}>
        {header}
        {choices}
      </Box>
    );
  }
}

Filter.propTypes = {
  all: PropTypes.bool,
  choices: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ])).isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func, // (values)
  status: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.string)
};

Filter.defaultProps = {
  all: true,
  inline: true,
  values: []
};
