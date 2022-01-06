import { useState, useEffect, useRef } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { OutlinedInput, InputAdornment, useMediaQuery, Popper, IconButton } from '@mui/material';

// icons
import { FiX } from '@react-icons/all-files/fi/FiX';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiSliders } from '@react-icons/all-files/fi/FiSliders';

// project imports
import { Transitions } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
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

const StyledIconButton = styled(IconButton)(({ theme, type }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
  transition: 'all .2s ease-in-out',
  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
  },
  marginLeft: theme.spacing(2),

  ...(type === 'closeIconButton' && {
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
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

const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  top: '-41px !important',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledFiSliders = styled(FiSliders)(() => ({
  transform: 'rotate3d(0, 0, 1, 90deg)',
}));

//================================|| SEARCH SECTION ||================================//

export const SearchSection = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const hidden = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    const setHidden = () => {
      setIsOpen(false);
    };
    setHidden();
  }, [hidden]);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const renderSearch = (
    <StyledOutlinedInput
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
          <StyledIconButton>
            <StyledFiSliders />
          </StyledIconButton>
          {hidden && (
            <StyledIconButton type="closeIconButton" onClick={() => setIsOpen(false)}>
              <FiX />
            </StyledIconButton>
          )}
        </InputAdornment>
      }
    />
  );
  return (
    <>
      {hidden ? (
        <>
          <StyledIconButton ref={ref} onClick={() => setIsOpen(true)}>
            <FiSearch strokeWidth={1.5} />
          </StyledIconButton>
          <StyledPopper open={isOpen} anchorEl={ref.current} transition>
            {({ TransitionProps }) => (
              <Transitions type="zoom" transformOrigin="center left" {...TransitionProps}>
                {renderSearch}
              </Transitions>
            )}
          </StyledPopper>
        </>
      ) : (
        <>{renderSearch}</>
      )}
    </>
  );
};
