import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import { MainCard, SkeletonPopularCard } from 'components';
import { gridSpacing } from 'constants/constants';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// style constant

const MuiMoreHorizOutlinedIcon = styled(MoreHorizOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary[200],
  cursor: 'pointer',
}));

const MuiDivider = styled(Divider)(() => ({
  marginTop: '12px',
  marginBottom: '12px',
}));

const MuiAvatarSuccess = styled(Avatar)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '5px',
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  marginLeft: '15px',
}));

const SuccessDark = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.dark,
}));

const MuiAvatarError = styled(Avatar)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '5px',
  backgroundColor: theme.palette.orange.light,
  color: theme.palette.orange.dark,
  marginLeft: '15px',
}));

const ErrorDark = styled(Typography)(({ theme }) => ({
  color: theme.palette.orange.dark,
}));

const MuiCardActions = styled(CardActions)(() => ({
  padding: '10px',
  paddingTop: 0,
  justifyContent: 'center',
}));

//-----------------------|| DASHBOARD DEFAULT - POPULAR CARD ||-----------------------//

const PopularCard = ({ isLoading }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Popular Stocks</Typography>
                  </Grid>
                  <Grid item>
                    <MuiMoreHorizOutlinedIcon
                      fontSize="small"
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Bajaj Finery
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $1839.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <MuiAvatarSuccess>
                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </MuiAvatarSuccess>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <SuccessDark variant="subtitle2">10% Profit</SuccessDark>
                  </Grid>
                </Grid>
                <MuiDivider />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          TTML
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $100.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <MuiAvatarError variant="rounded">
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </MuiAvatarError>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ErrorDark variant="subtitle2">10% loss</ErrorDark>
                  </Grid>
                </Grid>
                <MuiDivider />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Reliance
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $200.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <MuiAvatarSuccess variant="rounded">
                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </MuiAvatarSuccess>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <SuccessDark variant="subtitle2">10% Profit</SuccessDark>
                  </Grid>
                </Grid>
                <MuiDivider />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          TTML
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $189.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <MuiAvatarError variant="rounded">
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </MuiAvatarError>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ErrorDark variant="subtitle2">10% loss</ErrorDark>
                  </Grid>
                </Grid>
                <MuiDivider />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Stolon
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              $189.00
                            </Typography>
                          </Grid>
                          <Grid item>
                            <MuiAvatarError variant="rounded">
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </MuiAvatarError>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ErrorDark variant="subtitle2">10% loss</ErrorDark>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <MuiCardActions>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </MuiCardActions>
        </MainCard>
      )}
    </React.Fragment>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default PopularCard;
