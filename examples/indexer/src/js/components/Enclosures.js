// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component, PropTypes } from 'react'
import Items from './Items'

class Enclosures extends Component {

  render() {
    return (
      <Items category="enclosures" routePrefix="/enclosures">
        {this.props.children}
      </Items>
    )
  }
}

export default Enclosures;
