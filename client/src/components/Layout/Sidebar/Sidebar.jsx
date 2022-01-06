// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, Grid, useMediaQuery } from '@mui/material';

// project imports
import { MenuList } from './MenuList/MenuList';
import { drawerWidth } from 'constants/constants';
import { LogoSection, Scrollbar } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const StyledDrawer = styled(Drawer)(({ theme }) => ({
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

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: 'calc(100vh - 88px)',
  paddingLeft: '16px',
  paddingRight: '16px',
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'none',
  lineHeight: '0px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    padding: '16px',
  },
}));
//================================|| SIDEBAR DRAWER ||================================//

export const Sidebar = ({ isDrawerOpen, drawerToggle }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <StyledGrid container>
        <LogoSection />
      </StyledGrid>
      <StyledScrollBar component="div">
        <MenuList />
      </StyledScrollBar>
    </>
  );

  return (
    <StyledDrawer
      variant={matchUpMd ? 'persistent' : 'temporary'}
      anchor="left"
      open={isDrawerOpen}
      onClose={drawerToggle}
      ModalProps={{ keepMounted: true }}
      color="inherit"
    >
      {drawer}
    </StyledDrawer>
  );
};
