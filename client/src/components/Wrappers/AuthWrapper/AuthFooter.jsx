// material-ui
import { Link, Typography, Stack } from '@mui/material';

//================================|| FOOTER - AUTHENTICATION ||================================//

export const AuthFooter = () => {
  return (
    <Stack direction="row" justifyContent="center">
      <Typography variant="subtitle2" component={Link} href="https://github.com/suspectum" target="_blank" underline="hover">
        See On Github
      </Typography>
    </Stack>
  );
};
