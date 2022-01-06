import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Menu, Button, MenuItem, Typography, Dialog, Box, TextField } from '@mui/material';

// icons
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

// project imports
import { CustomDateForm } from './_CustomDateForm';
import { SET_QUERY, SET_ALERT } from 'constants/actionTypes';
import { fDateM, today, yesterday, lastWeek, lastMonth, thisMonth, thisYear, _startOfDay, _endOfDay } from 'utils';

const DEFAULT_QUERY_OPTIONS = [
  { value: today, label: 'Today' },
  { value: yesterday, label: 'Yesterday' },
  { value: lastWeek, label: 'Last 7 days' },
  { value: lastMonth, label: 'Last 30 days' },
  { value: thisMonth, label: 'This Month' },
  { value: thisYear, label: 'This Year' },
];

//================================|| TRANSACTION DATE FILTER ||================================//

export const TransactionDateFilter = ({ location }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.transaction);

  const formik = useFormik({
    initialValues: {
      start: query.start,
      end: query.end,
    },
    validationSchema: Yup.object().shape({
      start: Yup.date().typeError('Invalid Date Format').required('Date is required'),
      end: Yup.date()
        .min(Yup.ref('start'), 'End date must be grater than or equal to start date')
        .typeError('Invalid Date Format')
        .required('Date is required'),
    }),
  });
  const { values, errors } = formik;

  // * useEffect on TransactionList component tracks "query" to fetch data.
  // * without useMemo, it makes useEffect to fetch data for each handleClose action
  const QUERY_OPTIONS = useMemo(
    () => [
      ...DEFAULT_QUERY_OPTIONS,
      ...[{ value: { start: _startOfDay(values.start), end: _endOfDay(values.end) }, label: 'Custom Date' }],
    ],
    [values.end, values.start]
  );

  // const QUERY_OPTIONS = [
  //   ...DEFAULT_QUERY_OPTIONS,
  //   ...[{ value: { start: _startOfDay(values.start), end: _endOfDay(values.end) }, label: 'Custom Date' }],
  // ];

  const index = QUERY_OPTIONS.map(function (el) {
    return el.value;
  }).indexOf(query);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(index < 0 ? QUERY_OPTIONS.length - 1 : index);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setIsMenuOpen(false);
    if (QUERY_OPTIONS[index].label === 'Custom Date') {
      setIsDialogOpen(true);
    } else {
      dispatch({ type: SET_QUERY, payload: { query: QUERY_OPTIONS[index].value } });
    }
  };

  const handleClose = () => {
    if (Object.keys(errors).length) {
      dispatch({ type: SET_ALERT, payload: { severity: 'error', message: errors.start || errors.end } });
    } else {
      dispatch({ type: SET_QUERY, payload: { query: QUERY_OPTIONS[selectedIndex].value } });
    }
    setIsDialogOpen(false);
    setIsMenuOpen(false);
  };

  const { start, end } = query;

  return (
    <>
      <Box sx={{ display: 'none' }}>
        {/* Custom Date Dialog */}
        <Dialog open={isDialogOpen} onClose={handleClose}>
          <CustomDateForm formik={formik} />
        </Dialog>
      </Box>
      {location === 'dashboard' ? (
        <TextField id="select-date-range" select value={QUERY_OPTIONS[selectedIndex].label}>
          {QUERY_OPTIONS.map((option, index) => (
            <MenuItem key={index} value={option.label} onClick={(e) => handleMenuItemClick(e, index)}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <>
          <Button
            ref={ref}
            color="inherit"
            disableRipple
            onClick={() => setIsMenuOpen(true)}
            endIcon={isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
          >
            Date Range:&nbsp;
            <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {fDateM(start) === fDateM(end) ? fDateM(start) : `(${fDateM(start)} - ${fDateM(end)})`}
            </Typography>
          </Button>
          <Menu
            keepMounted
            anchorEl={ref.current}
            open={isMenuOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {QUERY_OPTIONS.map((option, index) => (
              <MenuItem
                key={index}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
                sx={{ typography: 'body2' }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};
