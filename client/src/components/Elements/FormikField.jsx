import { Field, useField } from 'formik';
import { IconButton, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const FormikField = ({ handleShowPassword, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Field
      id={field.name}
      label={field.label}
      name={field.name}
      required={props.required}
      as={TextField}
      fullWidth
      margin="normal"
      size="large"
      type={props.type}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={
        field.name.toLowerCase().includes('password')
          ? {
              endAdornment: (
                <IconButton disableFocusRipple={true} disableRipple={true} onClick={handleShowPassword}>
                  {props.type === 'password' ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }
          : null
      }
      {...props}
    />
  );
};
