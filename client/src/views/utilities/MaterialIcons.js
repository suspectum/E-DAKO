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

//============================|| MATERIAL ICONS ||============================//

export const MaterialIcons = () => {
  return (
    <MainCard title="Material Icons">
      <Card sx={{ overflow: 'hidden' }}>
        <Frame title="Material Icon" width="100%" src="https://material-ui.com/components/material-icons/" />
      </Card>
    </MainCard>
  );
};
