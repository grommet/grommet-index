// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import CheckBox from 'grommet/components/CheckBox';
import RadioButton from 'grommet/components/RadioButton';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import StatusIcon from 'grommet/components/icons/Status';
import CaretDownIcon from 'grommet/components/icons/base/CaretDown';
import CaretUpIcon from 'grommet/components/icons/base/CaretUp';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Props from 'grommet/utils/Props';

const CLASS_ROOT = 'index-filter';

export default class Filter extends Component {

  constructor (props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onChangeAll = this._onChangeAll.bind(this);
    this._onToggleActive = this._onToggleActive.bind(this);

    this.state = {active: this.props.active};
  }

  _onChange (value) {
    const { exclusive } = this.props;
    let values;
    if (exclusive) {
      values = [value];
    } else {
      values = this.props.values.slice(0);
      const index = values.indexOf(value);
      if (-1 === index) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }
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
    const { name, values, choices, all, exclusive, status } = this.props;
    const Type = (exclusive ? RadioButton : CheckBox);
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
        <Type key={id}
          id={id} label={label} checked={checked}
          onChange={this._onChange.bind(this, choice.value)} />
      );
    });

    if (all) {
      let label = <FormattedMessage id="All" defaultMessage="All" />;
      checkBoxes.unshift(
        <Type key={`${name}-all`}
          id={`${name}-all`} label={label} checked={values.length === 0}
          onChange={this._onChangeAll} />
      );
    }
    return (
      <Box direction="column" pad={{between: 'small'}}
        className={`${CLASS_ROOT}__body`}>
        {checkBoxes}
      </Box>
    );
  }

  _renderSummary () {
    const { values, choices, all } = this.props;
    let summary;
    if (values.length === 0) {
      if (all) {
        summary = <FormattedMessage id="All" defaultMessage="All" />;
      }
    } else if (values.length === 1) {
      summary = choices
        .filter(choice => values.indexOf(choice.value) !== -1)
        .map(choice => choice.label);
    } else {
      summary = (
        <FormattedMessage
          id="FilterSummary"
          defaultMessage={`${values.length} selected values`}
        />
      );
    }
    return <label><strong>{summary}</strong></label>;
  }

  render () {
    const { label, inline } = this.props;
    const { active } = this.state;
    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    let header = <Heading tag="h3">{label}</Heading>;
    if (! inline) {
      let summary = this._renderSummary();
      let icon;
      if (active) {
        icon = <CaretUpIcon />;
      } else {
        icon = <CaretDownIcon />;
      }

      header = (
        <Box direction="row" justify="between" align="center"
          responsive={false}
          className={`${CLASS_ROOT}__header`}
          onClick={this._onToggleActive}>
          <div>
            {header}
            {summary}
          </div>
          <Button icon={icon} onClick={this._onToggleActive} />
        </Box>
      );
    }

    let choices;
    if (inline || active) {
      choices = this._renderChoices();
    }

    return (
      <Box {...boxProps} pad={{...boxProps.pad, ...{between: 'small'}}}>
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
  exclusive: PropTypes.bool,
  inline: PropTypes.bool,
  active: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func, // (values)
  status: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.string)
};

Filter.defaultProps = {
  all: true,
  inline: true,
  active: false,
  values: []
};
