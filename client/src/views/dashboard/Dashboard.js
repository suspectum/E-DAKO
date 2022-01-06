import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { lastYear } from 'utils';
import { gridSpacing } from 'constants/constants';
import { getTransactionsSum, getTransactions } from 'actions';
import { SET_DASHBOARD, UPDATE_TRANSACTIONS } from 'constants/actionTypes';
import { ExpenseLineChartCard, IncomeLineChartCard, TopFiveCard, TotalExpenseCard, TotalIncomeCard, BarChart } from './Charts';

//================================|| DEFAULT DASHBOARD ||================================//

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { dasboardFirstLoad, totalIncomeLine, totalExpenseLine, topFiveIncomeExpense, updateDashboard } = useSelector(
    (state) => state.transaction
  );

  const [isLoading, setLoading] = useState(true);
  const [timeValue, setTimeValue] = useState(false);

  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  useEffect(() => {
    switch (true) {
      case dasboardFirstLoad:
      case updateDashboard:
        return fetchData();
      default:
        return setLoading(false);
    }

    async function fetchData() {
      const totalExpenseLine = await dispatch(getTransactionsSum('Expense'));
      const totalIncomeLine = await dispatch(getTransactionsSum('Income'));
      const topFiveIncomeExpense = await dispatch(getTransactions(lastYear));
      dispatch({ type: SET_DASHBOARD, payload: { totalIncomeLine, totalExpenseLine, topFiveIncomeExpense } });
      dispatch({
        type: UPDATE_TRANSACTIONS,
        payload: { updateDashboard: false },
      });
      setLoading(false);
    }
  }, [dasboardFirstLoad, dispatch, updateDashboard]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <IncomeLineChartCard isLoading={isLoading} data={totalIncomeLine} handleChangeTime={handleChangeTime} timeValue={timeValue} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ExpenseLineChartCard isLoading={isLoading} data={totalExpenseLine} handleChangeTime={handleChangeTime} timeValue={timeValue} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeCard isLoading={isLoading} data={totalIncomeLine} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalExpenseCard isLoading={isLoading} data={totalExpenseLine} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <BarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TopFiveCard isLoading={isLoading} data={topFiveIncomeExpense} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
