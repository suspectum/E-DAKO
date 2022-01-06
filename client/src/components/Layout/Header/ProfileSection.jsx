import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

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
} from '@mui/material';

// project imports
import { logOut } from 'actions';
import { useAuth, auth } from 'utils';
import { MainCard, Transitions, Switches, NavItem, Scrollbar, ImgAvatar } from 'components';

// icons
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';

//================================|| STYLED COMPONENTS ||================================//

const StyledAvatar = styled(ImgAvatar)(({ theme }) => ({
  ...theme.typography.mediumIconButton,
  margin: '8px 0 8px 8px !important',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
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
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '16px !important',
  width: '332px',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    width: '275px',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
  marginBottom: '16px',
  marginTop: '16px',
}));

const StyledOutlinedInput = styled(OutlinedInput)(() => ({
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

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: '100%',
  maxHeight: 'calc(100vh - 250px)',
  overflowX: 'hidden',
}));

//================================|| PROFILE MENU ITEMS ||================================//

const profileItems = [
  {
    id: 'account-settings',
    title: 'Account Settings',
    url: '/user/account-settings',
    icon: FiSettings,
    // chip: {
    //   color: 'primary',
    //   variant: 'filled',
    //   size: 'small',
    //   label: 'Coded',
    //   avatar: 'C',
    // },
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
    disabled: true,
  },
  {
    id: 'logout',
    title: 'Log Out',
    icon: FiLogOut,
  },
];

//================================|| PROFILE SECTION ||================================//

export const ProfileSection = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [swtch, setSwtch] = useState({
    'Start DND Mode': true,
    'Allow Notifications': false,
  });

  const { id, lastName, role } = useAuth();

  const handleLogout = async () => {
    if (auth.currentUser) {
      await signOut(auth).catch((error) => {
        console.log(error);
      });
    }
    await dispatch(logOut());
    navigate('/auth');
  };

  const itemHandler = (item) => {
    item.id === 'logout' && handleLogout();
    setIsOpen(false);
  };

  const handleChange = (event) => {
    setSwtch({
      ...swtch,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <StyledChip
        ref={ref}
        onClick={() => setIsOpen(true)}
        icon={<StyledAvatar id={id} size="50" />}
        label={<FiSettings fontSize="20px" />}
        variant="outlined"
        aria-controls={isOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={isOpen}
        anchorEl={ref.current}
        transition
        disablePortal={true}
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
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
              <MainCard border={false} elevation={16} content={false}>
                <StyledCardContent>
                  <Grid container direction="column" spacing={0}>
                    <FlexGrid>
                      <Typography variant="h4">Good Morning,</Typography>
                      <NameTypography variant="h4">{lastName.toUpperCase()}</NameTypography>
                    </FlexGrid>
                    <Grid item>
                      <Typography variant="subtitle2">User Role is {role}</Typography>
                    </Grid>
                  </Grid>
                  <StyledOutlinedInput
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
                  <StyledScrollBar>
                    <StyledCard>
                      <CardContent>
                        <Grid container direction="column" spacing={3}>
                          <Switches items={swtch} onChange={handleChange} />
                        </Grid>
                      </CardContent>
                    </StyledCard>
                    <Divider />
                    <List>
                      {/* Profile Nav */}
                      {profileItems.map((item) => (
                        <NavItem key={item.id} item={item} onClick={() => itemHandler(item)} />
                      ))}
                    </List>
                  </StyledScrollBar>
                </StyledCardContent>
              </MainCard>
            </ClickAwayListener>
          </Transitions>
        )}
      </Popper>
    </>
  );
};
