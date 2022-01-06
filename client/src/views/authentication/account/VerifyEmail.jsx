import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// project imports
import { useQuery } from 'utils';
import { verifyEmail } from 'actions';
import { AuthWrapper, Loader } from 'components';

//================================|| VERIFY EMAIL ||================================//

export const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const [emailStatus, setEmailStatus] = useState('');

  useEffect(() => {
    const token = query.get('token');
    navigate('/verify-email', { replace: true });
    async function fetchData() {
      const { status } = await dispatch(verifyEmail({ token }));
      status === 'success' ? navigate('/auth') : setEmailStatus(status);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const body =
    emailStatus === 'error' ? (
      <>
        Verification failed, you can also verify your account using the <Link to="/forgot-password">forgot password</Link> page.
      </>
    ) : (
      <>
        <Loader />
        <>Verifying...</>
      </>
    );

  const caption = emailStatus !== 'success' && body.props.children;
  return <AuthWrapper title="Verify Email" caption={caption} />;
};
