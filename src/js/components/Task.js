// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('grommet/components/icons/Status');

var Task = React.createClass({

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  render: function () {
    var resource = this.props.resource;
    var status = resource.status || 'Unknown';
    return (
      <div>
        <div>
          <StatusIcon value={status.toLowerCase()} large={true} />
          <h3>{resource.name}</h3>
        </div>
        <h4>{resource.created}</h4>
        {this.props.associatedResource}
      </div>
    );
  }

});

module.exports = Task;
