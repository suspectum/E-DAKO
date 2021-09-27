import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box, Grid, Avatar, Button } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// project imports
import { update } from 'actions/userActions';
import { gridSpacing } from 'constants/constants';
import { FormikField, SubmitButton, MainCard, SubCard, Loader } from 'components';

// assets
import User1 from 'assets/images/users/user-round.svg';

// styled components
const Input = styled('input')({
  display: 'none',
});

const MuiInput = styled(FormikField)(({ theme }) => ({
  // ...theme.typography.customInput,
  margin: 0,
}));

////////////////////////////////////////////////////////////////////

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, id } = useSelector((state) => state.userSignIn.userInfo);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values) => {
    await dispatch(update(id, values));
  };

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .when('password', (password, schema) => {
        if (password) return schema.required('Confirm Password is required');
      }),
  });

  return (
    <SubCard title="Update Profile">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <MuiInput name="firstName" label="First Name" type="text" />
              </Grid>
              <Grid item xs={12} md={6}>
                <MuiInput name="lastName" label="Last Name" type="text" />
              </Grid>
              <Grid item xs={12}>
                <MuiInput name="email" label="Email Address" type="email" />
              </Grid>

              <Grid item sm={12}>
                <Typography variant="h5">Leave blank to keep the same password</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <MuiInput
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MuiInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                />
              </Grid>
            </Grid>
            <SubmitButton isSubmitting={isSubmitting} text="Submit" color="primary" size="medium" fullWidth={false} />
          </Form>
        )}
      </Formik>
    </SubCard>
  );
};

const ProfilePicture = () => {
  return (
    <SubCard title="Profile Picture">
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Avatar src={User1} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item textAlign="center">
          <Typography gutterBottom variant={'caption'}>
            Upload/Change Your Profile Image
          </Typography>
        </Grid>
        <Grid item>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button disableElevation variant="contained" size="small" component="span">
              Upload Avatar
            </Button>
          </label>
        </Grid>
      </Grid>
    </SubCard>
  );
};

//================================|| PublicRoutesWrapper ||================================//

const AccountSettings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && <Box sx={{ p: 3, pl: 0, pr: 0 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <MainCard title="Account">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={5} md={4}>
              <ProfilePicture />
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <UpdateProfile />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default AccountSettings;
