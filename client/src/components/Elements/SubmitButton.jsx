// material-ui
import { Box, Button, CircularProgress } from '@mui/material';

//===========================|| CUSTOM BUTTOn ||===========================//

export const SubmitButton = ({ isSubmitting, text, color = 'secondary', size = 'large', variant = 'contained', fullWidth = true }) => {
  return (
    <Box sx={{ position: 'relative', mt: 2 }} xs={12}>
      <Button disableElevation disabled={isSubmitting} fullWidth={fullWidth} size={size} type="submit" variant={variant} color={color}>
        {text}
      </Button>
      {isSubmitting && (
        <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
      )}
    </Box>
  );
};
