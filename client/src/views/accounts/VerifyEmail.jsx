import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// project imports
import { verifyEmail } from 'actions/userActions';
import { PublicRoutesWrapper, Loader } from 'components';
import { useQuery } from 'utils';

//================================|| EMAIL VERIFY ||================================//

const EmailVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const [emailStatus, setEmailStatus] = useState('');

  useEffect(() => {
    const token = query.get('token');
    navigate('/verify-email', { replace: true });
    async function fetch() {
      const { status } = await dispatch(verifyEmail({ token }));
      status === 'success' ? navigate('/') : setEmailStatus(status);
    }
    fetch();
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
  return <PublicRoutesWrapper title="Verify Email" caption={caption} />;
};

export default EmailVerify;
