// material-ui
import { styled } from '@mui/material/styles';
import { Grid, IconButton } from '@mui/material';

// project imports
import { LogoSection } from 'components';
import { SearchSection } from './SearchSection';
import { drawerWidth } from 'constants/constants';
import { ProfileSection } from './ProfileSection';

// icons
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';

//================================|| STYLED COMPONENTS ||================================//

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  width: `calc(${drawerWidth}px - ${theme.spacing(3)})`,
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'block',
  lineHeight: '0px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
  transition: 'all .2s ease-in-out',
  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
  },
}));

const Grow = styled('div')(() => ({
  flexGrow: 1,
}));

//================================|| NAVBAR / HEADER ||================================//

export const Header = ({ handleLeftDrawerToggle }) => {
  return (
    <>
      <Container>
        <StyledGrid container>
          <LogoSection />
        </StyledGrid>
        <StyledIconButton onClick={handleLeftDrawerToggle}>
          <FiMenu />
        </StyledIconButton>
      </Container>
      <SearchSection />
      <Grow />
      <ProfileSection />
    </>
  );
};
