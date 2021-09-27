import { useState } from 'react';

// material-ui
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// project imports
import { MainCard } from 'components';
import useFetch from './useFetch';

//==============================|| SAMPLE PAGE ||==============================//

const AccountSettings = () => {
  const [isTrig, setIsTrig] = useState(false);

  let url = 'https://jsonplaceholder.typicode.com/users';
  const { isLoading, error, data } = useFetch(url, isTrig);

  const Coo = () => {
    if (!isTrig) {
      return null;
    }
    if (isLoading)
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      );
    if (error) return 'Error...';
    return (
      <div>
        {data &&
          data.map((item) => (
            <Typography key={item.id} variant="body2">
              {item.name}
            </Typography>
          ))}
      </div>
    );
  };

  return (
    <MainCard title="Account Settings">
      <Button variant="contained" onClick={() => setIsTrig((prev) => !prev)}>
        Click
      </Button>
      <Button variant="contained" onClick={() => setIsTrig((prev) => !prev)}>
        Refresh Token
      </Button>
      <Coo />
    </MainCard>
  );
};

export default AccountSettings;
