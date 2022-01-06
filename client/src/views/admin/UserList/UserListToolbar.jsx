import { Link } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import { Toolbar, Typography, IconButton, Tooltip, OutlinedInput, InputAdornment } from '@mui/material';

// icons
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2';

// project imports
import { SubmitButton } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
}));

const StyledOutlinedInput = styled(OutlinedInput)(() => ({
  minWidth: '250px',
}));

const IconFiSearch = styled(FiSearch)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.grey[500],
  strokeWidth: 1.5,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  minHeight: '80px !important',
  display: 'flex',
  justifyContent: 'space-between',
}));

//================================|| USER LIST TOOLBAR ||================================//

export const UserListToolbar = ({ numSelected, filterName, onFilterName }) => {
  return (
    <StyledToolbar>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="secondary" variant="h4" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledOutlinedInput
          value={filterName}
          onChange={onFilterName}
          inputProps={{ 'aria-label': 'search' }}
          placeholder="Search user by name..."
          startAdornment={
            <InputAdornment position="start">
              <IconFiSearch />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="You don't have permission to do this">
          <span>
            <StyledIconButton disabled={true}>
              <FiTrash2 />
            </StyledIconButton>
          </span>
        </Tooltip>
      ) : (
        <SubmitButton component={Link} to={'/users/add'} text="Add User" color="primary" size="medium" fullWidth={false} />
      )}
    </StyledToolbar>
  );
};
