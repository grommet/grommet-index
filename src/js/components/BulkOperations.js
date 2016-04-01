// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';

export default function BulkOperations({component, items}) {
  const Component = component;
  return (
    <Box pad={{horizontal:'small'}}>
      <Menu size="small" inline={false} dropAlign={{right: 'right'}} direction="column">
        <Component items={items} />
      </Menu>
    </Box>
  );
};

BulkOperations.propTypes = {
  items: PropTypes.array,
  component: PropTypes.func.isRequired
};
