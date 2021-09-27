import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import { MainCard, SkeletonEarningCard } from 'components';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

// styled components
const MuiMainCard = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: '-85px',
    right: '-95px',
    [theme.breakpoints.down('xs')]: {
      top: '-105px',
      right: '-140px',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: '-125px',
    right: '-15px',
    opacity: 0.5,
    [theme.breakpoints.down('xs')]: {
      top: '-155px',
      right: '-70px',
    },
  },
}));

const MuiAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.largeIconButton,
  backgroundColor: theme.palette.secondary[800],
  marginTop: '8px',
}));

const MuiAvatarRight = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary[200],
  zIndex: 1,
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: '2.125rem',
  fontWeight: 500,
  marginRight: '8px',
  marginTop: '14px',
  marginBottom: '6px',
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.secondary[200],
}));

const MuiAvatarCircle = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  ...theme.typography.smallIconButton,
  backgroundColor: theme.palette.secondary[200],
  color: theme.palette.secondary.dark,
}));

const MuiArrowUpwardIcon = styled(ArrowUpwardIcon)(() => ({
  transform: 'rotate3d(1, 1, 1, 45deg)',
}));

const MuiGetAppTwoToneIcon = styled(GetAppTwoToneIcon)(() => ({
  marginRight: '14px',
  fontSize: '1.25rem',
}));

const MuiFileCopyTwoToneIcon = styled(FileCopyTwoToneIcon)(() => ({
  marginRight: '14px',
  fontSize: '1.25rem',
}));

const MuiPictureAsPdfTwoToneIcon = styled(PictureAsPdfTwoToneIcon)(() => ({
  marginRight: '14px',
  fontSize: '1.25rem',
}));

const MuiArchiveTwoToneIcon = styled(ArchiveTwoToneIcon)(() => ({
  marginRight: '14px',
  fontSize: '1.25rem',
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const EarningCard = ({ isLoading }) => {
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
        <SkeletonEarningCard />
      ) : (
        <MuiMainCard border={false} contentClass={{ padding: '20px !important' }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <MuiAvatar variant="rounded">
                    <img src={EarningIcon} alt="Notification" />
                  </MuiAvatar>
                </Grid>
                <Grid item>
                  <MuiAvatarRight variant="rounded" aria-controls="menu-earning-card" aria-haspopup="true" onClick={handleClick}>
                    <MoreHorizIcon fontSize="inherit" />
                  </MuiAvatarRight>
                  <Menu
                    id="menu-earning-card"
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
                    <MenuItem onClick={handleClose}>
                      <MuiGetAppTwoToneIcon fontSize="inherit" /> Import Card
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <MuiFileCopyTwoToneIcon fontSize="inherit" /> Copy Data
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <MuiPictureAsPdfTwoToneIcon fontSize="inherit" /> Export
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <MuiArchiveTwoToneIcon fontSize="inherit" /> Archive File
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <CardHeading>$500.00</CardHeading>
                </Grid>
                <Grid item>
                  <MuiAvatarCircle>
                    <MuiArrowUpwardIcon fontSize="inherit" />
                  </MuiAvatarCircle>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <SubHeading>Total Earning</SubHeading>
            </Grid>
          </Grid>
        </MuiMainCard>
      )}
    </React.Fragment>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default EarningCard;
