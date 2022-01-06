import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

// materil-ui
import { Box, Grid, Typography } from '@mui/material';

const hasNumber = (number) => new RegExp(/[0-9]/).test(number);
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// set color based on password strength
const strengthColor = (temp, theme) => {
  if (temp < 2) return { label: 'Poor', color: theme.palette.error.main };
  if (temp < 3) return { label: 'Weak', color: theme.palette.warning.dark };
  if (temp < 4) return { label: 'Normal', color: theme.palette.orange.main };
  if (temp < 5) return { label: 'Good', color: theme.palette.success.main };
  if (temp < 6) return { label: 'Strong', color: theme.palette.success.dark };
  return false;
};

// password strength indicator
const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

//================================|| PASSWORD STRENGTH ||================================//

export const PasswordStrength = ({ val }) => {
  const theme = useTheme();
  const [level, setLevel] = useState('');

  useEffect(() => {
    const value = val ? val : '123456';
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp, theme));
  }, [val, theme]);

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box backgroundColor={level.color} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" fontSize="0.75rem">
            {level.label}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
