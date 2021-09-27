import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// project imports
import { forgotPassword } from 'actions/userActions';
import { FormikField, PublicRoutesWrapper, SubmitButton, Loader } from 'components';

// styled components
const MuiInput = styled(FormikField)(({ theme }) => ({
  ...theme.typography.customInput,
}));

//================================|| FORGOT PASSWORD ||================================//

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { status } = await dispatch(forgotPassword(values));
    status === 'success' && navigate('/');
  };

  const initialValues = {
    email: 'octavia.treutel44@ethereal.email',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  return (
    <PublicRoutesWrapper title="Forgot password?" caption="Enter your email address below and we'll send you password reset OTP.">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <MuiInput name="email" label="Email Address" type="email" />
            <SubmitButton isSubmitting={isSubmitting} text="Submit" />
          </Form>
        )}
      </Formik>
    </PublicRoutesWrapper>
  );
};

export default ForgotPassword;
