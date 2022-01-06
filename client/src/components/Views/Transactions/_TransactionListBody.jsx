import { TransitionGroup } from 'react-transition-group';

// material-ui
import { styled } from '@mui/material/styles';
import { Divider, Avatar, Typography, Grid, Collapse } from '@mui/material';

// icons
import { FiArrowLeft } from '@react-icons/all-files/fi/FiArrowLeft';
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight';

// project imports
import { types } from 'constants/categories';
import { fDateM, formatCurrency } from 'utils';
import { TransactionEditButton } from './_TransactionEditButton';

//================================|| STYLED COMPONENTS ||================================//

const StyledDivider = styled(Divider)(() => ({
  marginTop: '8px',
  marginBottom: '8px',
}));

const StyledAvatarIncome = styled(Avatar)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '5px',
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  marginLeft: '15px',
}));

const StyledAvatarExpense = styled(Avatar)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '5px',
  backgroundColor: theme.palette.orange.light,
  color: theme.palette.orange.dark,
  marginLeft: '15px',
}));

//================================|| TRANSACTION LIST BODY ||================================//

export const TransactionListBody = ({ transactions, page, rowsPerPage }) => {
  return (
    <TransitionGroup>
      {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
        <Collapse key={transaction.id}>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item display="flex" flexDirection="row" alignItems="center">
              <TransactionEditButton selectedTransaction={transaction} />
              <Grid item>
                <Typography variant="subtitle1" color="inherit">
                  {transaction.category}
                </Typography>
                <Typography variant="subtitle2">{fDateM(transaction.date)}</Typography>
              </Grid>
            </Grid>
            <Grid item display="flex" alignItems="center">
              <Typography variant="subtitle1" color="inherit">
                {formatCurrency(transaction.amount)}
              </Typography>
              {transaction.type === types.Income ? (
                <StyledAvatarIncome>
                  <FiArrowLeft />
                </StyledAvatarIncome>
              ) : (
                <StyledAvatarExpense variant="rounded">
                  <FiArrowRight />
                </StyledAvatarExpense>
              )}
            </Grid>
          </Grid>
          <StyledDivider />
        </Collapse>
      ))}
    </TransitionGroup>
  );
};
