import { useEffect, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import { MainCard, SkeletonTotalCard } from 'components';
import { formatCurrency, groupBy, sumReduce } from 'utils';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

//================================|| STYLED COMPONENTS ||================================//

const StyledMainCard = styled(MainCard)(({ theme }) => ({
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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.largeIconButton,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
  color: theme.palette.warning.dark,
}));

const StyledList = styled(List)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const StyledListItem = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const TypographySecondary = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  marginTop: '5px',
}));

const StyledListItemText = styled(ListItemText)(() => ({
  paddingTop: 5,
  paddingBottom: 5,
  marginTop: 0.45,
  marginBottom: 0.45,
}));

//================================|| DASHBOARD - TOTAL EXPENSE CARD ||================================//

export const TotalExpenseCard = ({ isLoading, data }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const groupByYear = groupBy(data, 'id', 'year');

    const reduceGroupAmountByDate = Object.keys(groupByYear).map((date) => {
      return sumReduce(groupByYear[date]);
    });

    const sum = reduceGroupAmountByDate
      .reduce((prev, curr) => {
        return parseFloat(prev) + parseFloat(curr);
      }, 0)
      .toFixed(2);

    setValue(sum);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalCard />
      ) : (
        <StyledMainCard contentClass={{ padding: '16px !important' }}>
          <StyledList>
            <StyledListItem alignItems="center" disableGutters>
              <ListItemAvatar>
                <StyledAvatar variant="rounded">
                  <LocalMallOutlinedIcon fontSize="inherit" />
                </StyledAvatar>
              </ListItemAvatar>
              <StyledListItemText
                disableTypography
                primary={<Typography variant="h4">{formatCurrency(value, 0)}</Typography>}
                secondary={<TypographySecondary variant="subtitle2">Total Expense</TypographySecondary>}
              />
            </StyledListItem>
          </StyledList>
        </StyledMainCard>
      )}
    </>
  );
};
