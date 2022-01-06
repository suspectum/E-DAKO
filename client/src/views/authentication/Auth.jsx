import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';

// material-ui
import { Checkbox, Grid, Typography, useMediaQuery, FormHelperText, Stack, Divider } from '@mui/material';

// project imports
import { signUp, signIn } from 'actions';
import { AuthGoogle } from './AuthGoogle';
import { StyledFormikTextField, AuthWrapper, PasswordStrength, SubmitButton, Loader } from 'components';

//===========================|| AUTH ||===========================//

export const Auth = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    if (isSignUp) {
      await dispatch(signUp(values));
      setIsSignUp(!isSignUp);
    } else {
      await dispatch(signIn(values));
    }
  };

  const initialValuesSignUp = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    rememberMe: '',
  };

  const initialValuesSignIn = {
    firstName: '',
    lastName: '',
    email: 'johndoe@example.com',
    password: 'pass123',
    confirmPassword: '',
    acceptTerms: '',
    rememberMe: false,
  };

  const initialValues = isSignUp ? initialValuesSignUp : initialValuesSignIn;

  const validationSchemaSignUp = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const validationSchema = isSignUp ? validationSchemaSignUp : validationSchemaSignIn;

  let val;
  return (
    <AuthWrapper title={isSignUp ? 'SignUp' : 'Hi, Welcome Back'} caption="Enter your credentials to continue">
      <AuthGoogle type={isSignUp ? 'signUp' : 'signIn'} />
      <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, handleChange, isSubmitting, touched }) => (
          <Form>
            {isSubmitting && <Loader />}
            {isSignUp && (
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={6}>
                  <StyledFormikTextField name="firstName" label="First Name" type="text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledFormikTextField name="lastName" label="Last Name" type="text" />
                </Grid>
              </Grid>
            )}
            <StyledFormikTextField name="email" label="Email Address" type="text" />
            <StyledFormikTextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => {
                val = e.target.value;
                handleChange(e);
              }}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <StyledFormikTextField
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
            )}

            {isSignUp && <PasswordStrength val={val} />}

            {isSignUp ? (
              <Grid container alignItems="center">
                <Field as={Checkbox} type="checkbox" name="acceptTerms" />
                <Typography variant="subtitle1">
                  Agree with{' '}
                  <Link style={{ color: 'inherit' }} to="#">
                    Terms & Condition.
                  </Link>
                </Typography>
                <Grid item>
                  <FormHelperText error>{touched.acceptTerms && errors.acceptTerms}</FormHelperText>
                </Grid>
              </Grid>
            ) : (
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <label>
                  <Grid container alignItems="center" width="auto">
                    <Field as={Checkbox} type="checkbox" name="rememberMe" color="primary" />
                    <Typography variant="subtitle1">Remember me</Typography>
                  </Grid>
                </label>
                <Typography variant="subtitle1" component={Link} to={'/forgot-password'} color="secondary" sx={{ textDecoration: 'none' }}>
                  Forgot Password?
                </Typography>
              </Stack>
            )}
            <SubmitButton isSubmitting={isSubmitting} text={isSignUp ? 'Sign Up' : 'Sign In'} />
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid item container direction="column" alignItems="center" xs={12}>
                <Typography onClick={switchMode} style={{ cursor: 'pointer' }} variant="subtitle1">
                  {isSignUp ? 'Have an account?' : "Don't have an account?"}
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthWrapper>
  );
};
