import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import { MainCard } from 'components';

// styled components
const Frame = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
}));

//============================|| MATERIAL ICONS ||============================//

const MaterialIcons = () => {
  return (
    <MainCard title="Material Icons">
      <Card sx={{ overflow: 'hidden' }}>
        <Frame title="Material Icon" width="100%" src="https://material-ui.com/components/material-icons/" />
      </Card>
    </MainCard>
  );
};

export default MaterialIcons;
