import { useFormik } from 'formik';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';

// project imports
import { getTransactions } from 'actions';
import { gridSpacing } from 'constants/constants';
import { SET_CUSTOM_TRANSACTIONS, UPDATE_TRANSACTIONS } from 'constants/actionTypes';
import { groupBy, formatCurrency, createSeries, filter, fTimeFrame, getAmount } from 'utils';
import { MainCard, SkeletonBarChart, TransactionDateFilter, TransactionFilterDrawer } from 'components';

// chart data
import { barChartData } from '../ChartData';

const QUERY_OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

//================================|| DASHBOARD DEFAULT - BAR CHART ||================================//

export const BarChart = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { cTransactionsFirstLoad, updateCustomTransactions, cTransactions, query } = useSelector((state) => state.transaction);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [displayBy, setDisplayBy] = useState('day');
  const [queryState, setQueryState] = useState(query);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredAmount, setFilteredAmount] = useState(null);

  const { primary } = theme.palette.text;
  const grey200 = theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[200];

  const primaryLight = theme.palette.primary.light;
  const primary200 = theme.palette.primary[200];
  const primaryMain = theme.palette.primary.main;
  const primary800 = theme.palette.primary[800];

  const secondaryLight = theme.palette.secondary.light;
  const secondary200 = theme.palette.secondary[200];
  const secondaryMain = theme.palette.secondary.main;
  const secondary800 = theme.palette.secondary[800];

  const grey500 = theme.palette.grey[500];

  //================================|| Formik ||================================//

  const formik = useFormik({
    initialValues: {
      type: '',
      category: '',
    },
  });

  const { resetForm, values } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    resetForm();
    setFilteredAmount(0);
  };

  const filterName = values;

  //================================|| Formik ||================================//

  useEffect(() => {
    switch (true) {
      case cTransactionsFirstLoad:
      case updateCustomTransactions:
      case queryState !== query:
        return fetchData();
      default:
        return;
    }
    async function fetchData() {
      const data = await dispatch(getTransactions(query));
      dispatch({ type: SET_CUSTOM_TRANSACTIONS, payload: { cTransactions: data } });
      dispatch({
        type: UPDATE_TRANSACTIONS,
        payload: { updateCustomTransactions: false },
      });
      setFilteredAmount(0);
      setQueryState(query);
    }
  }, [cTransactionsFirstLoad, dispatch, query, queryState, updateCustomTransactions]);

  useEffect(() => {
    const groupsByType = groupBy(cTransactions, 'type');

    const filterByCategory = filter(groupsByType[filterName.type], filterName);
    const groupsByCategory = filterByCategory && groupBy(filterByCategory, 'category');

    const chartSeries = groupsByCategory ? createSeries(groupsByCategory, displayBy) : createSeries(groupsByType, displayBy);

    setExpense(
      chartSeries
        .find(({ name }) => name.split(' ')[0] === 'Expense')
        ?.name.split('$')[1]
        .replace(/[^0-9.-]+/g, '') || 0
    );

    setIncome(
      chartSeries
        .find(({ name }) => name.split(' ')[0] === 'Income')
        ?.name.split('$')[1]
        .replace(/[^0-9.-]+/g, '') || 0
    );

    groupsByCategory &&
      setFilteredAmount(
        chartSeries
          .map(({ name }) => getAmount(name))
          .reduce((prev, curr) => prev + curr, 0)
          .toFixed(2)
      );

    const newChartData = {
      colors: [primary200, primaryMain, primaryLight, primary800, secondary200, secondaryMain, secondaryLight, secondary800],

      series: chartSeries,
      xaxis: {
        type: 'datetime',
        labels: {
          format: displayBy === 'day' ? 'dd/MMM' : 'MMM/yy',
          style: {
            colors: primary,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => formatCurrency(val),
          style: {
            colors: primary,
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        x: {
          formatter: (val) => fTimeFrame(val, displayBy),
        },
        y: {
          formatter: (val) => formatCurrency(val),
          title: {
            formatter: (seriesName) => seriesName.split('$')[0],
          },
        },

        theme: theme.palette.mode,
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
      chart: {
        toolbar: {
          tools: {
            customIcons: [
              {
                icon: `
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
                `,
                index: -6,
                title: 'Filter',
                class: 'custom-icon',
                click: handleOpenFilter,
              },
            ],
          },
        },
      },
    };

    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
      // * The new config object is merged with the existing config object preserving the existing configuration.
      // * https://apexcharts.com/docs/methods/#updateOptions
    }
  }, [
    cTransactions,
    displayBy,
    filterName,
    grey200,
    grey500,
    isLoading,
    primary,
    primary200,
    primary800,
    primaryLight,
    primaryMain,
    secondary200,
    secondary800,
    secondaryLight,
    secondaryMain,
    theme.palette.mode,
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonBarChart />
      ) : (
        <MainCard sx={{ height: '100%' }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Net Transaction</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">
                        {!filteredAmount ? formatCurrency(income - expense) : formatCurrency(filteredAmount)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item display="none">
                      <TransactionFilterDrawer
                        formik={formik}
                        isOpenFilter={openFilter}
                        onResetFilter={handleResetFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                      />
                    </Grid>
                    <Grid item>
                      <TransactionDateFilter location="dashboard" />
                    </Grid>
                    <Grid item>
                      <TextField id="select-dispalyBy" select value={displayBy} onChange={(event) => setDisplayBy(event.target.value)}>
                        {QUERY_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...barChartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};
