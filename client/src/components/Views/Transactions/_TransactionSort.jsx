import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// icons
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

// material-ui
import { Menu, Button, MenuItem, Typography } from '@mui/material';

// project imports
import { SET_TRANSACTIONS_SORT } from 'constants/actionTypes';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'desc', label: 'High-Low' },
  { value: 'asc', label: 'Low-High' },
];

//================================|| TRANSACTION SORT ||================================//

export const TransactionSort = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.transaction);

  const index = SORT_OPTIONS.map(function (el) {
    return el.value;
  }).indexOf(order);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(index);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    dispatch({ type: SET_TRANSACTIONS_SORT, payload: { order: SORT_OPTIONS[index].value } });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button ref={ref} color="inherit" disableRipple onClick={() => setOpen(true)} endIcon={open ? <FiChevronUp /> : <FiChevronDown />}>
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {SORT_OPTIONS[selectedIndex].label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={ref.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_OPTIONS.map((option, index) => (
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
  );
};
