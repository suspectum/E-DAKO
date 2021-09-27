import { useSelector } from 'react-redux';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

// project imports
import Google from 'assets/images/icons/social-google.svg';

// styled components
const MuiGoogleButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  backgroundColor: theme.palette.grey[50],
  border: '1px solid',
  borderColor: theme.palette.grey[100],
  color: theme.palette.grey[700],
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

const MuiButtonTex = styled(Button)(({ theme, customization }) => ({
  margin: theme.spacing(2),
  padding: '5px 56px',
  borderColor: `${theme.palette.grey[100]} !important`,
  color: `${theme.palette.grey[900]}!important`,
  borderRadius: `${customization.borderRadius}px`,
}));

const SignInIcon = styled('img')(({ theme }) => ({
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '8px',
  },
}));

//===========================|| AUTH GOOGLE ||===========================//

const AuthGoogle = ({ type }) => {
  const customization = useSelector((state) => state.customization);

  const googleHandler = async () => {
    if (type === 'signUp') {
      console.error('SignUp');
    } else {
      console.error('SignIn');
    }
  };
  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <MuiGoogleButton disableElevation fullWidth onClick={googleHandler} size="large" variant="contained">
          <SignInIcon src={Google} alt="google" width="20px" /> {type === 'signUp' ? 'Sign up with Google' : 'Sign in with Google'}
        </MuiGoogleButton>
      </Grid>
      <Grid item xs={12}>
        <Divider light>
          <MuiButtonTex variant="outlined" customization={customization} disabled>
            OR
          </MuiButtonTex>
        </Divider>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1"> {type === 'signUp' ? 'Sign up with Email address' : 'Sign in with Email address'}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthGoogle;
