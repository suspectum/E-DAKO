import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Stack } from '@mui/material';

// project imports
import { filter } from 'utils';
import { getTransactions } from 'actions';
import {
  SubCard,
  Spinner,
  TransactionFilterDrawer,
  TransactionSort,
  TransactionDateFilter,
  TransactionListFooter,
  TransactionListBody,
} from 'components';
import { SET_RECENT_TRANSACTIONS, SET_CUSTOM_TRANSACTIONS, UPDATE_TRANSACTIONS } from 'constants/actionTypes';

//================================|| TRANSACTION LIST ||================================//

export const TransactionList = ({ handleChange, isRecentTransactions }) => {
  const dispatch = useDispatch();
  const {
    order,
    query,
    rTransactions,
    cTransactions,
    rTransactionsFirstLoad,
    cTransactionsFirstLoad,
    updateRecentTransactions,
    updateCustomTransactions,
    updateDashboard,
  } = useSelector((state) => state.transaction);

  const orderBy = 'amount';
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, setQueryState] = useState(query);
  const [openFilter, setOpenFilter] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState(rTransactions);
  const [customTransactions, setCustomTransactions] = useState(cTransactions);

  useEffect(() => {
    switch (true) {
      case rTransactionsFirstLoad:
      case cTransactionsFirstLoad:
      case updateRecentTransactions:
      case updateCustomTransactions:
      case queryState !== query:
        return fetchData();
      default:
        setRowsPerPage(10);
        return setIsLoading(false);
    }

    async function fetchData() {
      if (isRecentTransactions) {
        let query = { limit: 5 };
        const data = await dispatch(getTransactions(query));
        dispatch({ type: SET_RECENT_TRANSACTIONS, payload: { rTransactions: data } });
        dispatch({
          type: UPDATE_TRANSACTIONS,
          payload: { updateRecentTransactions: false, updateCustomTransactions, updateDashboard },
        });
        setRecentTransactions(data);
      } else {
        const data = await dispatch(getTransactions(query));
        dispatch({ type: SET_CUSTOM_TRANSACTIONS, payload: { cTransactions: data } });
        dispatch({
          type: UPDATE_TRANSACTIONS,
          payload: { updateRecentTransactions, updateCustomTransactions: false, updateDashboard },
        });
        setQueryState(query);
        setCustomTransactions(data);
      }
      setIsLoading(false);
    }
  }, [
    query,
    dispatch,
    queryState,
    updateDashboard,
    isRecentTransactions,
    cTransactionsFirstLoad,
    rTransactionsFirstLoad,
    updateCustomTransactions,
    updateRecentTransactions,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
  };

  const secondaryActions = (
    <Stack direction="row" flexWrap="wrap-reverse" alignItems="center">
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <TransactionFilterDrawer
          formik={formik}
          isOpenFilter={openFilter}
          onResetFilter={handleResetFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
        />
        <TransactionSort />
      </Stack>
    </Stack>
  );

  const filterName = values;
  const filteredSortedTransactions = filter(customTransactions, filterName, order, orderBy);
  const transactions = isRecentTransactions ? recentTransactions : filteredSortedTransactions;

  return (
    <SubCard
      title={isRecentTransactions ? 'Recent Transactions' : <TransactionDateFilter />}
      secondary={!isRecentTransactions && secondaryActions}
    >
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <Spinner />
        </Box>
      ) : (
        transactions && (
          <>
            <TransactionListBody transactions={transactions} page={page} rowsPerPage={rowsPerPage} />
            <TransactionListFooter
              isRecentTransactions={isRecentTransactions}
              handleChange={handleChange}
              transactions={transactions}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )
      )}
    </SubCard>
  );
};
