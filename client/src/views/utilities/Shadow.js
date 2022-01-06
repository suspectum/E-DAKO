// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid } from '@mui/material';

// project imports
import { MainCard, SubCard } from 'components';
import { gridSpacing } from 'constants/constants';

//===============================|| SHADOW BOX ||===============================//

const ShadowBox = ({ shadow }) => {
  const theme = useTheme();
  return (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
          bgcolor: theme.palette.primary.light,
          color: theme.palette.grey[800],
        }}
      >
        <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
      </Box>
    </Card>
  );
};

//============================|| UTILITIES SHADOW ||============================//

export const UtilitiesShadow = () => {
  const shadows = [];

  for (let i = 0; i < 25; i++) {
    shadows[i] = i;
  }

  return (
    <MainCard title="Basic Shadow">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard title="Basic Shadow">
            <Grid container spacing={gridSpacing}>
              {shadows.map((i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <ShadowBox shadow={i} />
                </Grid>
              ))}
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};
