// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, Grid, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import { MenuList } from 'layout/Sidebar/MenuList/MenuList';
import { LogoSection } from 'components';
import { drawerWidth } from 'constants/constants';

// styled components
const MuiDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRight: 'none',
    [theme.breakpoints.up('md')]: {
      top: '80px',
    },
  },
}));

const Scrollbar = styled(PerfectScrollbar)(() => ({
  height: 'calc(100vh - 88px)',
  paddingLeft: '16px',
  paddingRight: '16px',
}));

const MuiGrid = styled(Grid)(({ theme }) => ({
  display: 'none',
  lineHeight: '0px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    padding: '16px',
  },
}));
//-----------------------|| SIDEBAR DRAWER ||-----------------------//

export const Sidebar = ({ drawerOpen, drawerToggle }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <MuiGrid container>
        <LogoSection />
      </MuiGrid>
      <Scrollbar component="div">
        <MenuList />
      </Scrollbar>
    </>
  );

  return (
    <MuiDrawer
      variant={matchUpMd ? 'persistent' : 'temporary'}
      anchor="left"
      open={drawerOpen}
      onClose={drawerToggle}
      ModalProps={{ keepMounted: true }}
      color="inherit"
    >
      {drawer}
    </MuiDrawer>
  );
};
