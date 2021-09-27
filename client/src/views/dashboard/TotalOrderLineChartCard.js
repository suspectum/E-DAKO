import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import { MainCard, SkeletonEarningCard } from 'components';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// styled components
const MuiMainCard = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
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
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
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
    zIndex: 1,
    width: '210px',
    height: '210px',
    background: theme.palette.primary[800],
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

const MuiAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.largeIconButton,
  backgroundColor: theme.palette.primary[800],
  color: '#fff',
  marginTop: '8px',
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: '2.125rem',
  fontWeight: 500,
  marginRight: '8px',
  marginTop: '14px',
  marginBottom: '6px',
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.primary[200],
}));

const MuiAvatarCircle = styled(Avatar)(({ theme }) => ({
  ...theme.typography.smallIconButton,
  cursor: 'pointer',
  backgroundColor: theme.palette.primary[200],
  color: theme.palette.primary.dark,
}));

const MuiArrowDownwardIcon = styled(ArrowDownwardIcon)(() => ({
  transform: 'rotate3d(1, 1, 1, 45deg)',
}));
//-----------------------|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||-----------------------//

const TotalOrderLineChartCard = ({ isLoading }) => {
  const [timeValue, setTimeValue] = React.useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MuiMainCard border={false} contentClass={{ padding: '20px !important' }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <MuiAvatar variant="rounded">
                    <LocalMallOutlinedIcon fontSize="inherit" />
                  </MuiAvatar>
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    variant={timeValue ? 'contained' : 'string'}
                    size="small"
                    onClick={(e) => handleChangeTime(e, true)}
                  >
                    Month
                  </Button>
                  <Button
                    disableElevation
                    variant={!timeValue ? 'contained' : 'string'}
                    size="small"
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
                    <Grid item>{timeValue ? <CardHeading>$108</CardHeading> : <CardHeading>$961</CardHeading>}</Grid>
                    <Grid item>
                      <MuiAvatarCircle>
                        <MuiArrowDownwardIcon fontSize="inherit" />
                      </MuiAvatarCircle>
                    </Grid>
                    <Grid item xs={12}>
                      <SubHeading>Total Order</SubHeading>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiMainCard>
      )}
    </React.Fragment>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalOrderLineChartCard;
