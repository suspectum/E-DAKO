import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  OutlinedInput,
  Popper,
  Typography,
  Avatar,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import { MainCard, Transitions, Switches } from 'components';
import { logout } from 'actions/userActions';
import { NavItem } from 'layout/Sidebar/MenuList/NavItem';

// assets
import User1 from 'assets/images/users/user-round.svg';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';
import { FiUser } from '@react-icons/all-files/fi/FiUser';

// styled components
const MuiAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.mediumIconButton,
  margin: '8px 0 8px 8px !important',
}));

const MuiChip = styled(Chip)(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.primary.light,
  backgroundColor: theme.palette.primary.light,
  '& svg': {
    stroke: theme.palette.primary.main,
  },
  '&[aria-controls="menu-list-grow"], &:hover': {
    borderColor: theme.palette.primary.main,
    background: `${theme.palette.primary.main}!important`,
    color: theme.palette.primary.light,
    '& svg': {
      stroke: theme.palette.primary.light,
    },
  },
  '& .MuiChip-label': {
    lineHeight: 0,
    padding: '12px',
  },
}));
const MuiCardContent = styled(CardContent)(({ theme }) => ({
  padding: '16px !important',
  width: '332px',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    width: '275px',
  },
}));

const MuiCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  marginBottom: '16px',
  marginTop: '16px',
}));

const MuiOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  paddingRight: '8px',
  paddingLeft: '16px',
  marginBottom: '16px',
  marginTop: '16px',
}));

const IconFiSearch = styled(FiSearch)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.grey[500],
  strokeWidth: 1.5,
}));

const FlexGrid = styled(Grid)(() => ({
  display: 'flex',
}));

const NameTypography = styled(Typography)(() => ({
  marginLeft: '2px',
  fontWeight: 400,
}));

const Scrollbar = styled(PerfectScrollbar)(() => ({
  height: '100%',
  maxHeight: 'calc(100vh - 250px)',
  overflowX: 'hidden',
}));

//-----------------------|| PROFILE MENU ITEMS ||-----------------------//

const profileItems = [
  {
    id: 'account-settings',
    title: 'Account Settings',
    url: '/user/account-settings',
    icon: FiSettings,
    chip: {
      color: 'primary',
      variant: 'filled',
      size: 'small',
      label: 'Coded',
      avatar: 'C',
    },
  },
  {
    id: 'social-profile',
    title: 'Social Profile',
    url: '/user/social-profile',
    icon: FiUser,
    chip: {
      color: 'warning',
      variant: 'filled',
      size: 'small',
      label: '2',
    },
  },
  {
    id: 'logout',
    title: 'Log Out',
    icon: FiLogOut,
  },
];

//-----------------------|| PROFILE MENU ||-----------------------//

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { lastName } = useSelector((state) => state.userSignIn.userInfo);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [swtch, setSwtch] = useState({
    'Start DND Mode': true,
    'Allow Notifications': false,
  });
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const itemHandler = (item) => {
    item.id === 'logout' && handleLogout();
    handleClose();
  };
  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSwtch({
      ...swtch,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <MuiChip
        icon={<MuiAvatar src={User1} />}
        label={<FiSettings fontSize="20px" />}
        variant="outlined"
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorEl}
        transition
        disablePortal={open}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [4, 16],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClose}>
              <MainCard border={false} elevation={16} content={false}>
                <MuiCardContent>
                  <Grid container direction="column" spacing={0}>
                    <FlexGrid>
                      <Typography variant="h4">Good Morning,</Typography>
                      <NameTypography variant="h4">{lastName.toUpperCase()}</NameTypography>
                    </FlexGrid>
                    <Grid item>
                      <Typography variant="subtitle2">Project Admin</Typography>
                    </Grid>
                  </Grid>
                  <MuiOutlinedInput
                    id="input-search-profile"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search profile options"
                    startAdornment={
                      <InputAdornment position="start">
                        <IconFiSearch />
                      </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                  <Divider />
                  <Scrollbar>
                    <MuiCard>
                      <CardContent>
                        <Grid container direction="column" spacing={3}>
                          <Switches items={swtch} onChange={handleChange} />
                        </Grid>
                      </CardContent>
                    </MuiCard>
                    <Divider />
                    <List>
                      {/* Profile Nav */}
                      {profileItems.map((item) => (
                        <NavItem key={item.id} item={item} onClick={() => itemHandler(item)} />
                      ))}
                    </List>
                  </Scrollbar>
                </MuiCardContent>
              </MainCard>
            </ClickAwayListener>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
