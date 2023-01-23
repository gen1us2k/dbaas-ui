import React from 'react';
import { Paper, styled, Typography } from '@mui/material';

const StyledPaper = styled(Paper)`
    padding: 40px 20px;
    flex: auto;
`;
function Backups() {
  return (
    <StyledPaper>
      <Typography variant="h4">
        Sorry!
      </Typography>
      <p>
        This page while under development!
      </p>
    </StyledPaper>
  );
}

export default Backups;
