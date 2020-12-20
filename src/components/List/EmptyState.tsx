import { Box, Typography } from '@material-ui/core';
import React from 'react';

export interface EmptyStateProps {
  title: string
}

const EmptyState: React.FunctionComponent<EmptyStateProps> = (props) => {
  return (
    <Box display="flex" height="100%" justifyContent="center" alignItems="center" p={1} bgcolor="background.paper">
      <Box>
        <Typography noWrap={true} color="textSecondary" variant="h6">
          {`Empty ${props.title}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default EmptyState;