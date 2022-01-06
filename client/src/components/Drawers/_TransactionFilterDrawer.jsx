import { useEffect, useState } from 'react';
import { Form, FormikProvider } from 'formik';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Radio, Button, Drawer, Checkbox, FormGroup, RadioGroup, FormControl, FormControlLabel } from '@mui/material';

// icons
import { BsFilter } from '@react-icons/all-files/bs/BsFilter';
import { MdClearAll } from '@react-icons/all-files/md/MdClearAll';

// project imports
import { SubCard, Scrollbar } from 'components';
import { gridSpacing } from 'constants/constants';
import { incomeCategories, expenseCategories, types } from 'constants/categories';

//================================|| STYLED COMPONENTS ||================================//

const StyledDrawer = styled(Drawer)(() => ({
  width: 280,
  '& .MuiDrawer-paper': {
    width: 280,
    border: 'none',
  },
}));

//================================|| TRANSACTION FILTER DRAWER ||================================//

export const TransactionFilterDrawer = ({ isOpenFilter, onResetFilter, onOpenFilter, onCloseFilter, formik }) => {
  const { values, getFieldProps } = formik;

  const [categories, setCategories] = useState([]);

  const FILTER_TYPE_OPTIONS = Object.values(types);
  const FILTER_CATEGORY_OPTIONS = categories.map((item) => item.type);

  useEffect(() => {
    values.category = '';
    setCategories(values.type === types.Income ? incomeCategories : expenseCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.type]);

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<BsFilter />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <StyledDrawer anchor="right" open={isOpenFilter} onClose={onCloseFilter}>
            <Scrollbar>
              <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                <Grid item xs={12}>
                  <SubCard title="Transaction Type">
                    <FormControl>
                      <RadioGroup {...getFieldProps('type')}>
                        {FILTER_TYPE_OPTIONS.map((item) => (
                          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </SubCard>
                </Grid>
                <Grid item xs={12}>
                  <SubCard title="Transaction Category">
                    <FormGroup>
                      {FILTER_CATEGORY_OPTIONS.map((item) => (
                        <FormControlLabel
                          key={item}
                          control={<Checkbox {...getFieldProps('category')} value={item} checked={values.category.includes(item)} />}
                          label={item}
                        />
                      ))}
                    </FormGroup>
                  </SubCard>
                </Grid>
              </Grid>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<MdClearAll />}
              >
                Clear All
              </Button>
            </Box>
          </StyledDrawer>
        </Form>
      </FormikProvider>
    </>
  );
};
