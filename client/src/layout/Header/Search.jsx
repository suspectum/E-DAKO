import { useState, useEffect } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { OutlinedInput, InputAdornment, useMediaQuery, Popper, IconButton } from '@mui/material';

import { FiX } from '@react-icons/all-files/fi/FiX';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiSliders } from '@react-icons/all-files/fi/FiSliders';

// project imports
import { Transitions } from 'components';

// styled components
const MuiOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  width: '450px',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  paddingLeft: '16px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: '0',
    marginRight: '0',
  },
}));

const IconFiSearch = styled(FiSearch)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.grey[500],
  strokeWidth: 1.5,
}));

const MuiIconButton = styled(IconButton)(({ theme, type }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
  transition: 'all .2s ease-in-out',
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
  },
  marginLeft: theme.spacing(2),

  ...(type === 'closeIconButton' && {
    background: theme.palette.orange.light,
    color: theme.palette.orange.dark,
    '&:hover': {
      background: theme.palette.orange.dark,
      color: theme.palette.orange.light,
    },
    popperContainer: {
      zIndex: theme.zIndex.drawer + 1,
      width: '100%',
      top: '-41px !important',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }),
}));

const MuiPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  top: '-41px !important',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const Search = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const hidden = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const setHidden = () => {
      setAnchorEl(null);
    };
    setHidden();
  }, [hidden]);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const renderSearch = (
    <MuiOutlinedInput
      onChange={handleChange}
      placeholder="Search"
      inputProps={{ 'aria-label': 'search' }}
      startAdornment={
        <InputAdornment position="start">
          <IconFiSearch />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <MuiIconButton style={{ transform: [{ rotateY: '180deg' }] }}>
            <FiSliders />
          </MuiIconButton>
          {hidden && (
            <MuiIconButton type="closeIconButton" onClick={handleClose}>
              <FiX />
            </MuiIconButton>
          )}
        </InputAdornment>
      }
    />
  );

  return (
    <>
      {hidden ? (
        <>
          <MuiIconButton onClick={handleClick}>
            <FiSearch strokeWidth={1.5} />
          </MuiIconButton>
          <MuiPopper open={open} anchorEl={anchorEl} transition disablePortal={false}>
            {({ TransitionProps }) => (
              <Transitions type="zoom" transformOrigin="center left" {...TransitionProps}>
                {renderSearch}
              </Transitions>
            )}
          </MuiPopper>
        </>
      ) : (
        <>{renderSearch}</>
      )}
    </>
  );
};

export default Search;
