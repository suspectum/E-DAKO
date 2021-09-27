import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import { MainCard, TotalIncomeCard } from 'components';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styled component
const MuiMainCard = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: '-30px',
    right: '-180px',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: '-160px',
    right: '-130px',
  },
}));

const MuiAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.largeIconButton,
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.dark,
}));

const MuiList = styled(List)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const MuiListItem = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const TypographySecondary = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  marginTop: '5px',
}));

const MuiListItemText = styled(ListItemText)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
  marginTop: 0.45,
  marginBottom: 0.45,
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const TotalIncomeLightCard = ({ isLoading }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <MuiMainCard contentClass={{ padding: '16px !important' }}>
          <MuiList>
            <MuiListItem alignItems="center" disableGutters>
              <ListItemAvatar>
                <MuiAvatar variant="rounded">
                  <StorefrontTwoToneIcon fontSize="inherit" />
                </MuiAvatar>
              </ListItemAvatar>
              <MuiListItemText
                disableTypography
                primary={<Typography variant="h4">$203k</Typography>}
                secondary={<TypographySecondary variant="subtitle2">Total Income</TypographySecondary>}
              />
            </MuiListItem>
          </MuiList>
        </MuiMainCard>
      )}
    </React.Fragment>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeLightCard;
