// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';

export default function BulkOperations({content}) {
  return (
    <Box pad={{horizontal:'small'}}>
      {content}
    </Box>
  );
};

BulkOperations.propTypes = {
  content: PropTypes.element
};
