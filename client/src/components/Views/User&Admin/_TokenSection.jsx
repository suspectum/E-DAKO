import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// material-ui
import { Box } from '@mui/material';

// project imports
import { SubCard, Spinner } from 'components';
import { getActiveTokensById } from 'actions';

//================================|| TOKENS SECTION ||================================//

export const TokenSection = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getActiveTokensById(userInfo.id));
      setTokens(data);
      setIsLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const render = tokens?.map((token, i) => <li key={i}>{token}</li>);

  return (
    <SubCard title="Active Refresh Tokens">
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <Spinner />
        </Box>
      ) : (
        render
      )}
    </SubCard>
  );
};
