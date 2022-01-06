import { useState } from 'react';

// material-ui
import { Tabs, Tab, Box, Grid } from '@mui/material';

// project imports
import { useAuth } from 'utils';
import { gridSpacing } from 'constants/constants';
import { MainCard, PictureSection, TokenSection, AddEditSection } from 'components';

//================================|| ACCOUNT SETTINGS ||================================//

export const AccountSettings = () => {
  const [value, setValue] = useState(0);
  const userInfo = useAuth();
  let isOwnAccountUpdate = true;

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

  return (
    <MainCard title="Account Settings">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Account" {...a11yProps(0)} />
            <Tab label="Active Tokens" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={5} md={4}>
              <PictureSection userInfo={userInfo} />
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <AddEditSection userInfo={userInfo} isOwnAccountUpdate={isOwnAccountUpdate} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TokenSection userInfo={userInfo} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </MainCard>
  );
};
