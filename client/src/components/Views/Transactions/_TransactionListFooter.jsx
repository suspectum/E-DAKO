// material-ui
import { Grid, Button, TablePagination } from '@mui/material';

// icons
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';

//================================|| TRANSACTION LIST FOOTER ||================================//

export const TransactionListFooter = ({
  isRecentTransactions,
  handleChange,
  transactions,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <>
      {isRecentTransactions ? (
        <Grid item textAlign="center">
          <Button size="small" disableElevation onClick={handleChange}>
            View All
            <FiChevronRight size={15} />
          </Button>
        </Grid>
      ) : (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};
