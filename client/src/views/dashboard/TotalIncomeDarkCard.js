import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import { MainCard, TotalIncomeCard } from 'components';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styled components
const MuiMainCard = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: '-30px',
    right: '-180px',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '210px',
    height: '210px',
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: '-160px',
    right: '-130px',
  },
}));

const MuiAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.largeIconButton,
  backgroundColor: theme.palette.primary[800],
  color: '#fff',
}));

const MuiList = styled(List)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const MuiListItem = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const MuiListItemText = styled(ListItemText)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
  marginTop: 0.45,
  marginBottom: 0.45,
}));

const TypographyPrimary = styled(Typography)(() => ({
  color: '#fff',
}));

const TypographySecondary = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  marginTop: '5px',
}));

//-----------------------|| DASHBOARD - TOTAL INCOME DARK CARD ||-----------------------//

const TotalIncomeDarkCard = ({ isLoading }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <MuiMainCard border={false} contentClass={{ padding: '16px !important' }}>
          <MuiList>
            <MuiListItem alignItems="center" disableGutters>
              <ListItemAvatar>
                <MuiAvatar variant="rounded">
                  <TableChartOutlinedIcon fontSize="inherit" />
                </MuiAvatar>
              </ListItemAvatar>
              <MuiListItemText
                disableTypography
                primary={<TypographyPrimary variant="h4">$203k</TypographyPrimary>}
                secondary={<TypographySecondary variant="subtitle2">Total Income</TypographySecondary>}
              />
            </MuiListItem>
          </MuiList>
        </MuiMainCard>
      )}
    </React.Fragment>
  );
};

TotalIncomeDarkCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeDarkCard;
