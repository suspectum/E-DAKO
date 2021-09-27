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

//=============================|| TABLER ICONS ||=============================//

const TablerIcons = () => {
  return (
    <MainCard title="Tabler Icons">
      <Card sx={{ overflow: 'hidden' }}>
        <Frame title="Tabler Icons" width="100%" src="https://tablericons.com/" />
      </Card>
    </MainCard>
  );
};

export default TablerIcons;
