import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Tabs, Tab, Box, Grid } from '@mui/material';

// project imports
import { getById } from 'actions';
import { gridSpacing } from 'constants/constants';
import { MainCard, PictureSection, TokenSection, AddEditSection } from 'components';

//================================|| USER SETTINGS ||================================//

export const UserSettings = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const usersInfo = useSelector((state) => state.fetchedUsers.usersInfo);

  const { id } = useParams();

  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      async function fetchData() {
        const userData = await dispatch(getById(id));
        setUser(userData);
      }
      function setData() {
        const userData = usersInfo.find((user) => user.id === id);
        setUser(userData);
      }
      usersInfo ? setData() : fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const render = (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={5} md={4}>
        <PictureSection userInfo={user} />
      </Grid>
      <Grid item xs={12} sm={7} md={8}>
        <AddEditSection userInfo={user} isAddMode={isAddMode} />
      </Grid>
    </Grid>
  );

  return (
    <MainCard title={isAddMode ? 'Add User' : 'Edit User'}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Profile" {...a11yProps(0)} />
            {!isAddMode && <Tab label="Active Tokens" {...a11yProps(1)} />}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {isAddMode ? render : user && render}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TokenSection userInfo={user} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </MainCard>
  );
};
