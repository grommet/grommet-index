// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import { PropTypes } from 'react';

let attribute = PropTypes.shape({
  filter: PropTypes.shape({
    all: PropTypes.bool,
    values: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })).isRequired
  }),
  header: PropTypes.bool,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  render: PropTypes.func,
  size: PropTypes.string,
  sort: PropTypes.shape({
    direction: PropTypes.string
  }),
  timestamp: PropTypes.bool
});

export default {
  attribute: attribute,
  attributes: PropTypes.arrayOf(attribute),
  query: PropTypes.object,
  data: PropTypes.shape({
    total: PropTypes.number.isRequired,
    unfilteredTotal: PropTypes.number,
    start: PropTypes.number,
    count: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      actions: PropTypes.node,
      count: PropTypes.number.isRequired,
      label: PropTypes.node.isRequired,
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
      start: PropTypes.number,
      total: PropTypes.number
    }).isRequired)
  })
};
