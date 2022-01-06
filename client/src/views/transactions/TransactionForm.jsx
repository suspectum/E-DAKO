import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, useMediaQuery } from '@mui/material';

// project imports
// ! for creating random transaction data, no need in production version
// import { MOCK_TRANSACTIONS } from 'mocks';
import { createTransaction, editTransaction, deleteTransaction } from 'actions';
import { incomeCategories, expenseCategories, types } from 'constants/categories';
import { M0FormikSelect, FormikDatePicker, M0FormikCurrency, SubmitButton, SubCard, Loader } from 'components';

//================================|| TRANSACTION FORM ||================================//

export const TransactionForm = ({ selectedTransaction, handleClose }) => {
  const theme = useTheme();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [type, setType] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [mockData, setMockData] = useState(MOCK_TRANSACTIONS());

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    if (selectedTransaction) {
      await dispatch(editTransaction(selectedTransaction.id, values));
      handleClose();
    } else {
      await dispatch(createTransaction(values));
    }

    // ! for creating random transaction data, no need in production version
    // setMockData(MOCK_TRANSACTIONS());
    setSubmitting(false);
    resetForm(initialValues);
  };

  const handleDelete = async (setSubmitting) => {
    setSubmitting(true);
    await dispatch(deleteTransaction(selectedTransaction.id));
    setSubmitting(false);
    handleClose();
  };

  useEffect(() => {
    // remove after mock gone
    if (selectedTransaction) {
      setType(selectedTransaction.type);
      setSelectedCategories(type === types.Income ? incomeCategories : expenseCategories);
      const fields = ['type', 'category', 'amount', 'date'];
      fields.forEach((field) => formikRef.current.setFieldValue(field, selectedTransaction[field], false));
      return;
    }

    //* helps to eliminate unnecessary validation while switching between types
    formikRef.current.setTouched({ ...formikRef.current.touched, category: false });

    setSelectedCategories(type === types.Income ? incomeCategories : expenseCategories);

    // ! for creating random transaction data, no need in production version
    // setSelectedCategories(mockData.type === types.Income ? incomeCategories : expenseCategories);
    // const fields = ['type', 'category', 'amount', 'date'];
    // fields.forEach((field) => formikRef.current.setFieldValue(field, mockData[field], false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    type,
    // ! for creating random transaction data, no need in production version
    // mockData
  ]);

  useEffect(() => {
    if (selectedTransaction) {
      setType(selectedTransaction.type);
      const fields = ['type', 'category', 'amount', 'date'];
      fields.forEach((field) => formikRef.current.setFieldValue(field, selectedTransaction[field], false));
    }
  }, [selectedTransaction]);

  const initialValues = {
    type: '',
    category: '',
    amount: '',
    date: new Date(),
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().typeError('Amount must be a number').positive('Amount must be a positive number').required('Amount is required'),
    category: Yup.string()
      .oneOf(selectedCategories.map((item) => item.type))
      .required('Category is required'),
    type: Yup.string().required('Type is required'),
    date: Yup.date().typeError('Invalid Date Format').required('Date is required'),
  });

  return (
    <SubCard title={selectedTransaction ? 'Update Transaction' : 'Create Transaction'} style={{ paddingBtoom: 0 }}>
      <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, handleChange, setSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <M0FormikSelect
                  name="type"
                  label="Type"
                  obj={types}
                  onChange={(e) => {
                    setType(e.target.value);
                    handleChange(e);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <M0FormikSelect name="category" label="Category" obj={selectedCategories} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <M0FormikCurrency name="amount" label="Amount" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikDatePicker name="date" label="Date(mm/dd/yyyy)" />
              </Grid>
            </Grid>
            <Grid container display="flex" flexDirection={matchDownSm ? 'column' : 'row'} spacing={matchDownSm ? 0 : 2}>
              <Grid item>
                <SubmitButton
                  isSubmitting={isSubmitting}
                  text="Submit"
                  color="primary"
                  size="medium"
                  fullWidth={matchDownSm ? true : false}
                />
              </Grid>
              {selectedTransaction && (
                <Grid item>
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    text="Delete"
                    color="error"
                    size="medium"
                    fullWidth={matchDownSm ? true : false}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(setSubmitting);
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </SubCard>
  );
};
