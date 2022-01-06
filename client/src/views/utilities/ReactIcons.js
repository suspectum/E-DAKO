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

//=============================|| REACT ICONS ||=============================//

export const ReactIcons = () => {
  return (
    <MainCard title="React Icons">
      <Card sx={{ overflow: 'hidden' }}>
        <Frame title="React Icons" width="100%" src="https://react-icons.github.io/react-icons/search" />
      </Card>
    </MainCard>
  );
};
