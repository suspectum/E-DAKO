import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Stack,
  Grid,
} from '@mui/material';

// project imports
import { getAllUser } from 'actions';
import { fDate, filter } from 'utils';
import { UserMoreMenu } from './UserMoreMenu';
import { UserListHeader } from './UserListHeader';
import { UserListToolbar } from './UserListToolbar';
import { FETCHED_USERS_SUCESS } from 'constants/actionTypes';
import { MainCard, Scrollbar, Spinner, ImgAvatar } from 'components';

const headCells = [
  { id: 'firstName', label: 'User', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'created', label: 'Created', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: '' },
];

//===========================|| USER LIST ||===========================//

export const UserList = () => {
  const dispatch = useDispatch();
  const { accountDeleted } = useSelector((state) => state.fetchedUsers);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getAllUser());
      dispatch({ type: FETCHED_USERS_SUCESS, payload: { usersInfo: data, accountDeleted: false } });
      setUsers(data);
      setIsLoading(false);
    }
    fetchData();
  }, [dispatch, accountDeleted]);

  //helper functions
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredSortedUsers.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredSortedUsers = filter(users, filterName, order, orderBy);

  return (
    <MainCard title="User List" contentClass={{ width: '100%' }}>
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <Spinner />
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          {users && (
            <Paper sx={{ width: '100%', mb: 2 }}>
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

              <TableContainer sx={{ minWidth: 612 }}>
                <Scrollbar component="div">
                  <Table aria-labelledby="tableTitle" size="medium">
                    <UserListHeader
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={filteredSortedUsers.length}
                      headCells={headCells}
                    />
                    <TableBody>
                      {filteredSortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.id)} />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              <Stack direction="row" width="100%" alignItems="center" spacing={2}>
                                <Grid item>
                                  <ImgAvatar alt={row.firstName} id={row.id} size="50" />
                                </Grid>
                                <Grid item>
                                  <Typography variant="subtitle1" noWrap>
                                    {row.firstName} {row.lastName}
                                  </Typography>
                                  <Typography variant="subtitle2" noWrap>
                                    {row.email}
                                  </Typography>
                                </Grid>
                              </Stack>
                            </TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{fDate(row.created)}</TableCell>
                            <TableCell>{row.isVerified && 'Verified'}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu id={row.id} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </Box>
      )}
    </MainCard>
  );
};
