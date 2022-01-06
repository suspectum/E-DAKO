import { Form, FormikProvider } from 'formik';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { FormikDatePicker, SubCard } from 'components';

//================================|| CUSTOM DATE FORM ||================================//

export const CustomDateForm = ({ formik }) => {
  return (
    <SubCard title="Select Dates" style={{ paddingBtoom: 0 }}>
      <FormikProvider value={formik} validationSchema={formik}>
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormikDatePicker name="start" label="Start Date(mm/dd/yyyy)" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormikDatePicker name="end" label="End Date(mm/dd/yyyy)" />
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </SubCard>
  );
};
