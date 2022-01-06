import { useEffect, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'constants/constants';
import { TopFiveAreaChart } from './TopFiveAreaChart';
import { MainCard, SkeletonTopFiveCard } from 'components';
import { groupBy, formatCurrency, createSeries, filter, getAmount } from 'utils';

// icons
import { FiArrowLeft } from '@react-icons/all-files/fi/FiArrowLeft';
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

//================================|| STYLED COMPONENTS ||================================//

const StyledMoreHorizOutlinedIcon = styled(MoreHorizOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary[200],
  cursor: 'pointer',
}));

const StyledDivider = styled(Divider)(() => ({
  marginTop: '12px',
  marginBottom: '12px',
}));

const StyledAvatarSuccess = styled(Avatar)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '5px',
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  marginLeft: '15px',
}));

const SuccessDark = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.dark,
}));

const StyledAvatarError = styled(Avatar)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '5px',
  backgroundColor: theme.palette.orange.light,
  color: theme.palette.orange.dark,
  marginLeft: '15px',
}));

const ErrorDark = styled(Typography)(({ theme }) => ({
  color: theme.palette.orange.dark,
}));

const QUERY_OPTIONS = [{ value: 'Income' }, { value: 'Expense' }];

//================================|| DASHBOARD DEFAULT - TOP FIVE CARD ||================================//

export const TopFiveCard = ({ isLoading, data }) => {
  const [typeIndex, setTypeIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartSeries, setChartSeries] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [filteredAmount, setFilteredAmount] = useState(null);

  useEffect(() => {
    const displayBy = 'month';
    const filterName = { type: QUERY_OPTIONS[typeIndex].value, category: '' };

    if (data?.length) {
      const groupsByType = groupBy(data, 'type');
      const filterByCategory = filter(groupsByType[filterName.type], filterName);
      const groupsByCategory = groupBy(filterByCategory, 'category');
      const chartSeries = createSeries(groupsByCategory, displayBy);

      setFilteredAmount(
        chartSeries
          .map(({ name }) => getAmount(name))
          .reduce((prev, curr) => prev + curr, 0)
          .toFixed(2)
      );

      setChartSeries(
        chartSeries
          ?.sort(function (a, b) {
            return -(getAmount(a.name) - getAmount(b.name));
          })
          .slice(0, 5)
      );
    }
  }, [data, filteredAmount, typeIndex]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setTypeIndex(index);
    setCategoryIndex(0);
    handleClose();
  };

  const GRID_QUERY_OPTIONS = chartSeries?.map(({ name }) => {
    const category = name.split('$')[0];
    const amount = getAmount(name);
    const percent = `%${parseFloat((amount / filteredAmount) * 100).toFixed(2)}`;
    return { category, amount: formatCurrency(amount), percent };
  });

  return (
    <>
      {isLoading ? (
        <SkeletonTopFiveCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Top 5 {QUERY_OPTIONS[typeIndex].value} Items</Typography>
                  </Grid>
                  <Grid item>
                    <StyledMoreHorizOutlinedIcon
                      fontSize="small"
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      keepMounted
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      {QUERY_OPTIONS.map((option, index) => (
                        <MenuItem
                          key={index}
                          selected={index === typeIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          sx={{ typography: 'body2' }}
                        >
                          {option.value}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <TopFiveAreaChart data={chartSeries[categoryIndex]} options={GRID_QUERY_OPTIONS[categoryIndex]} />
              </Grid>
              <Grid item xs={12}>
                {GRID_QUERY_OPTIONS?.map((obj, i) => (
                  <Grid key={i} container direction="column" onClick={() => setCategoryIndex(i)} style={{ cursor: 'pointer' }}>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {obj.category}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {obj.amount}
                              </Typography>
                            </Grid>
                            <Grid item>
                              {QUERY_OPTIONS[typeIndex].value === 'Income' ? (
                                <StyledAvatarSuccess>
                                  <FiArrowLeft fontSize="small" color="inherit" />
                                </StyledAvatarSuccess>
                              ) : (
                                <StyledAvatarError>
                                  <FiArrowRight fontSize="small" color="inherit" />
                                </StyledAvatarError>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      {QUERY_OPTIONS[typeIndex].value === 'Income' ? (
                        <SuccessDark variant="subtitle2">{obj.percent}</SuccessDark>
                      ) : (
                        <ErrorDark variant="subtitle2">{obj.percent}</ErrorDark>
                      )}
                    </Grid>
                    <StyledDivider />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};
