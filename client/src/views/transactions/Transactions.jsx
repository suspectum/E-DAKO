import { useState } from 'react';

// material-ui
import { Tabs, Tab, Box, Grid } from '@mui/material';

// project imports
import { MainCard } from 'components';
import { gridSpacing } from 'constants/constants';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';

//================================|| TRANSACTION ||================================//

export const Transactions = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...otherProps } = props;
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...otherProps}>
        {value === index && <Box sx={{ p: 3, pl: 0, pr: 0 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  let isRecentTransactions = true;

  return (
    <div>
      <MainCard title="Transactions">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Create Transaction" {...a11yProps(0)} />
              <Tab label="Transactions" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <TransactionForm />
              </Grid>
              <Grid item xs={12} md={6}>
                <TransactionList isRecentTransactions={isRecentTransactions} handleChange={(e) => handleChange(e, 1)} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <TransactionList isRecentTransactions={!isRecentTransactions} />
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </MainCard>
    </div>
  );
};
