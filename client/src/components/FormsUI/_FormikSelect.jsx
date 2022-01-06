import { Field, useField } from 'formik';

// material-ui
import { styled } from '@mui/material/styles';
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';

//================================|| FORMIK SELECT ||================================//

export const FormikSelect = ({ handleShowPassword, obj, ...otherProps }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(otherProps);

  let render;

  if (!obj.length) {
    render = Object.values(obj).map((value, index) => (
      <MenuItem key={index} value={value}>
        {value}
      </MenuItem>
    ));
  } else {
    render = obj.map((item) => (
      <MenuItem key={item.type} value={item.type}>
        {item.type}
      </MenuItem>
    ));
  }

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <InputLabel>{otherProps.label}</InputLabel>
      <Field as={Select} {...otherProps}>
        {render}
      </Field>

      <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};

export const M0FormikSelect = styled((props) => <FormikSelect {...props} />)(() => ({
  margin: 0,
}));
