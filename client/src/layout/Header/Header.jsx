// material-ui
import { styled } from '@mui/material/styles';
import { Grid, IconButton } from '@mui/material';

// project imports
import { LogoSection } from 'components';
import SearchSection from './Search';
import ProfileSection from './Profile';
import { drawerWidth } from 'constants/constants';

// assets
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';

// style components
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  width: `calc(${drawerWidth}px - ${theme.spacing(3)})`,
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}));

const MuiGrid = styled(Grid)(({ theme }) => ({
  display: 'block',
  lineHeight: '0px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MuiIconButton = styled(IconButton)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
  transition: 'all .2s ease-in-out',
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
  },
}));

const Grow = styled('div')(() => ({
  flexGrow: 1,
}));
//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

export const Header = ({ handleLeftDrawerToggle }) => {
  return (
    <>
      {/* logo & toggler button */}
      <Container>
        <MuiGrid container>
          <LogoSection />
        </MuiGrid>
        <MuiIconButton onClick={handleLeftDrawerToggle}>
          <FiMenu />
        </MuiIconButton>
      </Container>

      {/* header search */}
      <SearchSection />
      <Grow />

      {/* notification & profile */}
      <ProfileSection />
    </>
  );
};
