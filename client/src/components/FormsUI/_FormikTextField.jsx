import { Field, useField } from 'formik';

// material-ui
import { styled } from '@mui/material/styles';
import { IconButton, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//================================|| FORMIK TEXT FIELD ||================================//

export const FormikTextField = ({ handleShowPassword, ...otherProps }) => {
  const [field, meta] = useField(otherProps);

  return (
    <Field
      as={TextField}
      fullWidth
      margin="normal"
      size="large"
      required={otherProps.required}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={
        field.name.toLowerCase().includes('password')
          ? {
              endAdornment: (
                <IconButton disableFocusRipple={true} disableRipple={true} onClick={handleShowPassword}>
                  {otherProps.type === 'password' ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }
          : null
      }
      {...otherProps}
    />
  );
};

export const StyledFormikTextField = styled((props) => <FormikTextField {...props} />)(({ theme }) => ({
  ...theme.typography.customInput,
}));

export const M0FormikTextField = styled((props) => <FormikTextField {...props} />)(() => ({
  margin: 0,
}));
