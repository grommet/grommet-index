// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Section = require('grommet/components/Section');
var Header = require('grommet/components/Header');
var StatusIcon = require('grommet/components/icons/Status');

var Alert = React.createClass({

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  render: function () {
    var resource = this.props.resource;
    var status = resource.status || 'unknown';
    var createdDate;
    if (resource.created) {
      createdDate = resource.created;
    }

    return (
      <Section className="alert" pad={{horizontal: "medium"}}>
        <Header>
          <span>
            <StatusIcon value={status.toLowerCase()} large={true} />
            <h3>{resource.name}</h3>
          </span>
        </Header>
        <span className="alert__timestamp">{createdDate}</span>
        {this.props.associatedResource}
      </Section>
    );
  }

});

module.exports = Alert;
