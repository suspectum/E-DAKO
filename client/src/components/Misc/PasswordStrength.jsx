import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import value from 'assets/scss/_themes-vars.module.scss';

const hasNumber = (number) => new RegExp(/[0-9]/).test(number);
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
const strengthColor = (count) => {
  if (count < 2) return { label: 'Poor', color: value.errorMain };
  if (count < 3) return { label: 'Weak', color: value.warningDark };
  if (count < 4) return { label: 'Normal', color: value.orangeMain };
  if (count < 5) return { label: 'Good', color: value.successMain };
  if (count < 6) return { label: 'Strong', color: value.successDark };
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

export const PasswordStrength = ({ val }) => {
  const [level, setLevel] = useState('');

  useEffect(() => {
    const value = val ? val : '123456';
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  }, [val]);

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
