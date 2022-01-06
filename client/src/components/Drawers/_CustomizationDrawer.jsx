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

// icons
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';

// project imports
import { config } from 'config';
import { SubCard, Scrollbar } from 'components';
import { gridSpacing } from 'constants/constants';
import { BORDER_RADIUS, FONT_FAMILY, THEME_MODE } from 'constants/actionTypes';

//================================|| STYLED COMPONENTS ||================================//

const StyledDrawer = styled(Drawer)(() => ({
  width: 280,
  '& .MuiDrawer-paper': {
    width: 280,
    border: 'none',
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  bottom: 0,
  right: 20,
  margin: 32,
  position: 'fixed',
  boxShadow: theme.shadows[8],
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.main,
  '& .MuiSlider-valueLabel': {
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  label: {
    '& .MuiSvgIcon-root': { fontSize: 28 },
    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] },
  },
}));

//================================|| CUSTOMIZATION ||================================//

export const Customization = () => {
  const fonts = config.fontFamilies;
  const modes = config.themeMode;
  const dispatch = useDispatch();
  const { customization } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
  const [fontFamily, setFontFamily] = useState(customization.fontFamily);
  const [themeMode, setThemeMode] = useState(customization.themeMode);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleBorderRadius = (event, newValue) => {
    setBorderRadius(newValue);
  };

  useEffect(() => {
    dispatch({ type: BORDER_RADIUS, payload: borderRadius });
  }, [borderRadius, dispatch]);

  useEffect(() => {
    dispatch({ type: FONT_FAMILY, payload: fontFamily });
  }, [dispatch, fontFamily]);

  useEffect(() => {
    dispatch({ type: THEME_MODE, payload: themeMode });
  }, [dispatch, themeMode]);

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <StyledFab component="div" onClick={handleToggle} size="medium" color="secondary">
          <IconButton color="inherit" disableRipple>
            <FiSettings />
          </IconButton>
        </StyledFab>
      </Tooltip>

      <StyledDrawer anchor="right" open={open} onClose={handleToggle}>
        <Scrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <SubCard title="Layout Mode">
                <FormControl>
                  <RadioGroup
                    row
                    aria-label="font-family"
                    value={themeMode}
                    onChange={(e) => setThemeMode(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    {modes.map((font, index) => {
                      return <StyledFormControlLabel key={index} value={font} control={<Radio />} label={font} />;
                    })}
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              <SubCard title="Font Family">
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    {fonts.map((font, index) => {
                      return <StyledFormControlLabel key={index} value={font} control={<Radio />} label={font} />;
                    })}
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              <SubCard title="Border Radius">
                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <StyledSlider
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
        </Scrollbar>
      </StyledDrawer>
    </>
  );
};
