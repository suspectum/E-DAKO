import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { drawerWidth } from 'constants/constants';
import { DRAWER_OPEN } from 'constants/actionTypes';

//================================|| STYLED COMPONENTS ||================================//

const Wrapper = styled('div')(() => ({
  display: 'flex',
}));

const StyledAppbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'isDrawerOpen' })(({ theme, isDrawerOpen }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - ${drawerWidth}px)`,

  [theme.breakpoints.up('md')]: {
    marginLeft: -(drawerWidth - 20),
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    padding: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    marginRight: '10px',
    padding: '16px',
  },

  ...(isDrawerOpen && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      marginRight: '10px',
      padding: '16px',
    },
  }),
}));

//================================|| MAIN LAYOUT ||================================//

export const Layout = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch({ type: DRAWER_OPEN, payload: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  // Handle left drawer
  const { isDrawerOpen } = useSelector((state) => state.drawer);
  const handleLeftDrawerToggle = () => {
    dispatch({ type: DRAWER_OPEN, payload: !isDrawerOpen });
  };

  return (
    <Wrapper>
      {/* header */}
      <StyledAppbar position="fixed" color="inherit" elevation={0}>
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </StyledAppbar>

      {/* drawer */}
      <Sidebar isDrawerOpen={isDrawerOpen} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main isDrawerOpen={isDrawerOpen}>{children}</Main>
    </Wrapper>
  );
};
