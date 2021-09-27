import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// project imports
import { validateResetToken, resetPassword } from 'actions/userActions';
import { FormikField, PublicRoutesWrapper, PasswordStrength, SubmitButton, Loader } from 'components';
import { useQuery } from 'utils';

// styled components
const MuiInput = styled(FormikField)(({ theme }) => ({
  ...theme.typography.customInput,
}));

//================================|| RESET PASSWORD ||================================//

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = query.get('token');
    navigate('/reset-password', { replace: true });
    setToken(token);
    async function fetch() {
      const { status } = await dispatch(validateResetToken({ token }));
      setTokenStatus(status);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values) => {
    const { status } = await dispatch(resetPassword({ ...values, token }));
    status === 'success' && navigate('/');
  };

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const body =
    tokenStatus === 'error' ? (
      <>
        Token validation failed, if the token has expired you can get a new one at the <Link to="/forgot-password">forgot password</Link>{' '}
        page.
      </>
    ) : (
      <>
        <Loader />
        <>Verifying...</>
      </>
    );

  const caption = tokenStatus !== 'success' && body.props.children;
  let val;
  return (
    <PublicRoutesWrapper title="Reset Password" caption={caption}>
      {tokenStatus === 'success' && (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, handleChange }) => (
            <Form>
              <MuiInput
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  val = e.target.value;
                  handleChange(e);
                }}
                handleShowPassword={handleShowPassword}
              />
              <MuiInput
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              <PasswordStrength val={val} />
              <SubmitButton isSubmitting={isSubmitting} text="Submit" />
            </Form>
          )}
        </Formik>
      )}
    </PublicRoutesWrapper>
  );
};

export default ResetPassword;
