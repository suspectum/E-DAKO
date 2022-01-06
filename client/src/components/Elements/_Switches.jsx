// material-ui
import { Grid, Switch, Typography } from '@mui/material';

//===========================|| SWITCHES ||===========================//

export const Switches = ({ items, onChange: onChangeProp }) =>
  Object.entries(items).map(([key, value], index) => (
    <Grid item key={index}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="subtitle1">{key}</Typography>
        </Grid>
        <Grid item>
          <Switch checked={value} onChange={onChangeProp} name={key} size="small" />
        </Grid>
      </Grid>
    </Grid>
  ));
