import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// project imports
import { forgotPassword } from 'actions';
import { StyledFormikTextField, AuthWrapper, SubmitButton, Loader } from 'components';

//================================|| FORGOT PASSWORD ||================================//

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { status } = await dispatch(forgotPassword(values));
    status === 'success' && navigate('/auth');
  };

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  return (
    <AuthWrapper title="Forgot password?" caption="Enter your email address below and we'll send you password reset OTP.">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <StyledFormikTextField name="email" label="Email Address" type="text" />
            <SubmitButton isSubmitting={isSubmitting} text="Submit" />
          </Form>
        )}
      </Formik>
    </AuthWrapper>
  );
};
