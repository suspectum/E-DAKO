import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithPopup, GoogleAuthProvider, setPersistence, inMemoryPersistence } from 'firebase/auth';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

// icons
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';

// project import
import { auth } from 'utils';
import { errorHandler, firebaseAuth } from 'actions';

//================================|| STYLED COMPONENTS ||================================//

const StyledGoogleButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100],
  color: theme.palette.grey[700],
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.primary.light,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

const StyledButtonTex = styled(Button)(({ theme, customization }) => ({
  margin: theme.spacing(2),
  padding: '5px 56px',
  borderColor: `${theme.palette.grey[100]} !important`,
  color: `${theme.palette.grey[900]}!important`,
  borderRadius: `${customization.borderRadius}px`,
}));

//===========================|| AUTH GOOGLE ||===========================//

export const AuthGoogle = ({ type }) => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      userCred?.getIdToken();
    });
  }, []);

  const googleHandler = async () => {
    try {
      await setPersistence(auth, inMemoryPersistence).then(() => {
        const provider = new GoogleAuthProvider();
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        return signInWithPopup(auth, provider);
      });

      auth.currentUser
        .getIdToken()
        .then((idToken) => dispatch(firebaseAuth(idToken)))
        .catch((error) => console.log(error));
    } catch (error) {
      errorHandler(error.message);
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <StyledGoogleButton
          startIcon={<FcGoogle fontSize="22px" />}
          disableElevation
          fullWidth
          onClick={googleHandler}
          size="large"
          variant="contained"
        >
          {type === 'signUp' ? 'Sign up with Google' : 'Sign in with Google'}
        </StyledGoogleButton>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <StyledButtonTex variant="outlined" customization={customization} disabled>
            OR
          </StyledButtonTex>
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
