import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { styled } from '@mui/material/styles';
import {
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import { SubCard } from 'components';
import { BORDER_RADIUS, FONT_FAMILY } from 'constants/actionTypes';
import { gridSpacing } from 'constants/constants';
import config from 'config';

// assets
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';

// styled components
const MuiDrawer = styled(Drawer)(() => ({
  width: 280,
  '& .MuiDrawer-paper': {
    width: 280,
    border: 'none',
  },
}));

const MuiFab = styled(Fab)(({ theme }) => ({
  bottom: 0,
  right: 20,
  margin: 32,
  position: 'fixed',
  boxShadow: theme.shadows[8],
}));

const MuiSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.main,
  '& .MuiSlider-valueLabel': {
    color: theme.palette.secondary.light,
  },
}));

const MuiFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  label: {
    '& .MuiSvgIcon-root': { fontSize: 28 },
    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] },
  },
}));

//-----------------------|| LIVE CUSTOMIZATION ||-----------------------//

export const Customization = () => {
  const fonts = config.fontFamilies;
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  // state - border radius
  const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
  const handleBorderRadius = (event, newValue) => {
    setBorderRadius(newValue);
  };
  useEffect(() => {
    dispatch({ type: BORDER_RADIUS, payload: borderRadius });
  }, [dispatch, borderRadius]);

  // state - font family
  const [fontFamily, setFontFamily] = useState(customization.fontFamily);
  useEffect(() => {
    dispatch({ type: FONT_FAMILY, payload: fontFamily });
  }, [dispatch, fontFamily]);

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <MuiFab component="div" onClick={handleToggle} size="medium" color="secondary">
          <IconButton color="inherit" disableRipple>
            <FiSettings />
          </IconButton>
        </MuiFab>
      </Tooltip>

      <MuiDrawer anchor="right" onClose={handleToggle} open={open}>
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              {/* font family */}
              <SubCard title="Font Family">
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    {fonts.map((font, index) => {
                      return <MuiFormControlLabel key={index} value={font} control={<Radio />} label={font} />;
                    })}
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              {/* border radius */}
              <SubCard title="Border Radius">
                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <MuiSlider
                      size="small"
                      value={borderRadius}
                      onChange={handleBorderRadius}
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider-small-steps"
                      marks
                      step={2}
                      min={4}
                      max={24}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      24px
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </MuiDrawer>
    </>
  );
};
