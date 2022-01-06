// material-ui
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

// project imports
import { MainCard } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const Frame = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
}));

//=============================|| TABLER ICONS ||=============================//

export const TablerIcons = () => {
  return (
    <MainCard title="Tabler Icons">
      <Card sx={{ overflow: 'hidden' }}>
        <Frame title="Tabler Icons" width="100%" src="https://tablericons.com/" />
      </Card>
    </MainCard>
  );
};
