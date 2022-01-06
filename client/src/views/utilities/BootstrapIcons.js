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

//=============================|| BOOTSTRAP ICONS ||=============================//

export const BootstrapIcons = () => {
  return (
    <MainCard title="Bootstrap Icons">
      <Card sx={{ overflow: 'hidden' }}>
        <Frame title="Bootstrap Icons" width="100%" src="https://icons.getbootstrap.com/" />
      </Card>
    </MainCard>
  );
};
