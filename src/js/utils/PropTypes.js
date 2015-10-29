// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var attribute = React.PropTypes.shape({
  name: React.PropTypes.string,
  header: React.PropTypes.bool,
  hidden: React.PropTypes.bool,
  label: React.PropTypes.string,
  size: React.PropTypes.string,
  timestamp: React.PropTypes.bool,
  render: React.PropTypes.func
});

module.exports = {
  attribute: attribute,
  attributes: React.PropTypes.arrayOf(attribute),
  result: React.PropTypes.shape({
    total: React.PropTypes.number,
    unfilteredTotal: React.PropTypes.number,
    start: React.PropTypes.number,
    count: React.PropTypes.number,
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    error: React.PropTypes.string
  })
};
