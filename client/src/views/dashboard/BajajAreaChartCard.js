import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

import { Card, CardContent, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// styled components
const MuiCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));

const MuiCardContent = styled(CardContent)(() => ({
  padding: '0px !important',
}));

const ContentContainer = styled(Grid)(() => ({
  padding: '16px',
  paddingBottom: 0,
  color: '#fff',
}));

//===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||===========================//

const BajajAreaChartCard = () => {
  const theme = useTheme();
  const orangeDark = theme.palette.secondary[800];

  React.useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light',
      },
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [orangeDark]);

  return (
    <MuiCard>
      <MuiCardContent>
        <ContentContainer container>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                  Bajaj Finery
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                  $1839.00
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
              10% Profit
            </Typography>
          </Grid>
        </ContentContainer>
        <Chart {...chartData} />
      </MuiCardContent>
    </MuiCard>
  );
};

export default BajajAreaChartCard;
