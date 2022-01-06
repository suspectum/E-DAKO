import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

import { Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import { areaChartData } from '../ChartData';

//================================|| STYLED COMPONENTS ||================================//

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));

const StyledCardContent = styled(CardContent)(() => ({
  padding: '0px !important',
}));

const ContentContainer = styled(Grid)(() => ({
  padding: '16px',
  paddingBottom: 0,
  color: '#fff',
}));

//===========================|| DASHBOARD DEFAULT - TOP FIVE AREA CHART ||===========================//

export const TopFiveAreaChart = ({ data, options }) => {
  const theme = useTheme();
  const deepPurpleDark = theme.palette.secondary[800];

  const [chartData, setchartData] = useState(areaChartData);

  useEffect(() => {
    setchartData({
      ...areaChartData,
      options: {
        ...areaChartData.options,
        colors: [deepPurpleDark],
      },
      series: data ? [data] : [],
    });
  }, [data, deepPurpleDark]);

  return (
    <StyledCard>
      <StyledCardContent>
        <ContentContainer container>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                  {options?.category}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                  {options?.amount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
              {options?.percent}
            </Typography>
          </Grid>
        </ContentContainer>
        <Chart {...chartData} />
      </StyledCardContent>
    </StyledCard>
  );
};
