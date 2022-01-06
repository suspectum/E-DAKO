import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Button, Grid, Typography, Tooltip } from '@mui/material';

// project imports
import { lineChartData } from '../ChartData';
import { MainCard, SkeletonLineCard } from 'components';
import { groupBy, createSeries, fTimeFrame, formatCurrency } from 'utils';

// icons
import { FiTrendingUp } from '@react-icons/all-files/fi/FiTrendingUp';
import { FiTrendingDown } from '@react-icons/all-files/fi/FiTrendingDown';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

//================================|| STYLED COMPONENTS ||================================//

const StyledMainCard = styled(MainCard)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? theme.palette.dark : theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(210.04deg, '.concat(theme.palette.secondary.dark, ' -50.94%, rgba(144, 202, 249, 0) 95.49%)')
        : theme.palette.secondary[800],
    borderRadius: '50%',
    top: '-85px',
    right: '-95px',
    [theme.breakpoints.down('xs')]: {
      top: '-105px',
      right: '-140px',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(140.9deg, '.concat(theme.palette.secondary.dark, ' -14.02%, rgba(144, 202, 249, 0) 85.50%)')
        : theme.palette.secondary[800],
    borderRadius: '50%',
    top: '-125px',
    right: '-15px',
    opacity: 0.5,
    [theme.breakpoints.down('xs')]: {
      top: '-155px',
      right: '-70px',
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.largeIconButton,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary[800],
  color: '#fff',
  marginTop: '8px',
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  marginRight: '8px',
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary[200],
}));

const StyledAvatarCircle = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  ...theme.typography.smallIconButton,
  backgroundColor: theme.palette.secondary[200],
  color: theme.palette.secondary.dark,
}));

//===========================|| DASHBOARD DEFAULT -  INCOME LINE CHART CARD ||===========================//

export const IncomeLineChartCard = ({ isLoading, data, handleChangeTime, timeValue }) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [currentAmount, setCurrentAmount] = useState();
  const [previousAmount, setPreviousAmount] = useState();

  useEffect(() => {
    const groupByYear = groupBy(data, 'id', 'year');

    const series = timeValue ? createSeries(data) : createSeries(groupByYear);
    setChartSeries(series);

    const query = timeValue ? 'month-year' : 'year';
    const currentDate = fTimeFrame(new Date(), query);
    const timeIndex = series[0].data.findIndex(({ x }) => x === currentDate);

    // * if timeIndex < 0 there is no data for currentDate, set 0
    setCurrentAmount(formatCurrency(data.length && timeIndex >= 0 ? series[0].data[timeIndex]?.y : 0, 0));
    setPreviousAmount(formatCurrency(data.length && timeIndex - 1 >= 0 ? series[0].data[timeIndex - 1]?.y : 0, 0));
  }, [data, timeValue]);

  let icon;

  if (currentAmount > previousAmount) {
    icon = <FiTrendingUp />;
  } else {
    icon = <FiTrendingDown />;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonLineCard />
      ) : (
        <StyledMainCard border={false} contentClass={{ padding: '20px !important' }} sx={{ height: '100%' }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <StyledAvatar variant="rounded">
                    <AccountBalanceWalletOutlinedIcon fontSize="inherit" />
                  </StyledAvatar>
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    variant={timeValue ? 'contained' : 'string'}
                    size="small"
                    color="secondary"
                    onClick={(e) => handleChangeTime(e, true)}
                  >
                    Month
                  </Button>
                  <Button
                    disableElevation
                    variant={!timeValue ? 'contained' : 'string'}
                    size="small"
                    color="secondary"
                    onClick={(e) => handleChangeTime(e, false)}
                  >
                    Year
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 0.75 }}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <CardHeading>{currentAmount}</CardHeading>
                    </Grid>
                    <Grid item>
                      <StyledAvatarCircle>
                        <Tooltip placement="top" title={timeValue ? `Previous Month ${previousAmount}` : `Previous Year ${previousAmount}`}>
                          <span>{icon}</span>
                        </Tooltip>
                      </StyledAvatarCircle>
                    </Grid>
                    <Grid item xs={12}>
                      <SubHeading>{timeValue ? 'This Month Income' : 'This Year Income'}</SubHeading>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Chart {...lineChartData} series={chartSeries} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledMainCard>
      )}
    </>
  );
};
