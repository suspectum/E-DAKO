import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import { deleteUser } from 'actions/_userActions';
import { SubCard, SubmitButton, Loader } from 'components';

//================================|| USER DELETE ||================================//

export const UserDelete = ({ handleClose, id }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);
    await dispatch(deleteUser(id));
    handleClose();
  };

  return (
    <SubCard title="Delete Account" style={{ paddingBtoom: 0 }}>
      {isSubmitting && <Loader />}
      <Grid container display="flex" flexDirection="column" alignItems="center">
        <Grid item>
          <Typography>Are you sure you want to delete the account?</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <SubmitButton text="Delete" color="error" size="medium" fullWidth={false} onClick={handleClick} isSubmitting={isSubmitting} />
            </Grid>
            <Grid item>
              <SubmitButton text="Cancel" color="primary" size="medium" fullWidth={false} onClick={handleClose} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SubCard>
  );
};
