import { Field, useField, useFormikContext } from 'formik';

// material-ui
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//================================|| FORMIK DATE PICKER ||================================//

export const FormikDatePicker = (props) => {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Field
        as={DatePicker}
        value={field.value}
        onChange={(newValue) => setFieldValue(field.name, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props} // name={field.name}  && label ={field.label}
            onBlur={() => setFieldTouched(field.name, true, true)}
            error={Boolean(meta.error)}
            helperText={meta.error}
            style={{ width: '100%' }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
