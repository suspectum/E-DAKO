import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

import { AppBar, Toolbar, useMediaQuery } from '@mui/material';

// third-party

// project imports
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { drawerWidth } from 'constants/constants';
import { DRAWER_OPEN } from 'constants/actionTypes';

// styled components
const Wrapper = styled('div')(() => ({
  display: 'flex',
}));

const MuiAppbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'drawerOpen' })(({ theme, drawerOpen }) => ({
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

  ...(drawerOpen && {
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

//-----------------------|| MAIN LAYOUT ||-----------------------//

export const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch({ type: DRAWER_OPEN, payload: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  // Handle left drawer
  const drawerOpen = useSelector((state) => state.customization.drawerOpen);
  const handleLeftDrawerToggle = () => {
    dispatch({ type: DRAWER_OPEN, payload: !drawerOpen });
  };
  return (
    <Wrapper>
      {/* header */}
      <MuiAppbar position="fixed" color="inherit" elevation={0}>
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </MuiAppbar>

      {/* drawer */}
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main drawerOpen={drawerOpen}>
        <Outlet />
      </Main>
    </Wrapper>
  );
};
