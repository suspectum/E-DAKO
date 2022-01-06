import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, useMediaQuery } from '@mui/material';

// project imports
import { Roles } from 'constants/constants';
import { update, createUser } from 'actions';
import { M0FormikTextField, M0FormikSelect, SubmitButton, SubCard, Loader } from 'components';

//================================|| UPDATE SECTION ||================================//

export const AddEditSection = ({ userInfo, isAddMode, isOwnAccountUpdate }) => {
  const theme = useTheme();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isAddMode) {
      const fields = ['firstName', 'lastName', 'email', 'role'];
      fields.forEach((field) => formikRef.current.setFieldValue(field, userInfo[field], false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    if (isAddMode) {
      await dispatch(createUser(values));
    } else {
      await dispatch(update(userInfo.id, values));
    }
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchemaAdd = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const validationSchemaEdit = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .when('password', (password, schema) => {
        if (password) return schema.required('Confirm Password is required');
      }),
  });

  const validationSchema = isAddMode ? validationSchemaAdd : validationSchemaEdit;

  return (
    <SubCard title={isOwnAccountUpdate ? 'Update Profile' : isAddMode ? 'Add User' : 'Edit User'}>
      <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <M0FormikTextField name="firstName" label="First Name" type="text" />
              </Grid>
              <Grid item xs={12} md={6}>
                <M0FormikTextField name="lastName" label="Last Name" type="text" />
              </Grid>
              <Grid item xs={12} md={isOwnAccountUpdate ? 12 : 9}>
                <M0FormikTextField name="email" label="Email Address" type="text" />
              </Grid>
              {!isOwnAccountUpdate && (
                <Grid item xs={12} md={3}>
                  <M0FormikSelect name="role" label="Role" obj={Roles} />
                </Grid>
              )}

              {!isAddMode && (
                <Grid item sm={12}>
                  <Typography variant="h5">Leave blank to keep the same password</Typography>
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <M0FormikTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <M0FormikTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                />
              </Grid>
            </Grid>
            <SubmitButton isSubmitting={isSubmitting} text="Submit" color="primary" size="medium" fullWidth={matchDownMd ? true : false} />
          </Form>
        )}
      </Formik>
    </SubCard>
  );
};
