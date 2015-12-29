// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import { PropTypes } from 'react';

var attribute = PropTypes.shape({
  name: PropTypes.string,
  header: PropTypes.bool,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  timestamp: PropTypes.bool,
  render: PropTypes.func
});

export default {
  attribute: attribute,
  attributes: PropTypes.arrayOf(attribute),
  result: PropTypes.shape({
    total: PropTypes.number,
    unfilteredTotal: PropTypes.number,
    start: PropTypes.number,
    count: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string
  })
};
