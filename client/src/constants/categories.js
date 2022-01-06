export const incomeCategories = [
  { type: 'Gifts', amount: 0 },
  { type: 'Salary', amount: 0 },
  { type: 'Savings', amount: 0 },
  { type: 'Lottery', amount: 0 },
  { type: 'Deposits', amount: 0 },
  { type: 'Business', amount: 0 },
  { type: 'Investments', amount: 0 },
  { type: 'Extra income', amount: 0 },
  { type: 'Rental income', amount: 0 },
];

export const expenseCategories = [
  { type: 'Car', amount: 0 },
  { type: 'Pets', amount: 0 },
  { type: 'Food', amount: 0 },
  { type: 'House', amount: 0 },
  { type: 'Other', amount: 0 },
  { type: 'Phone', amount: 0 },
  { type: 'Bills', amount: 0 },
  { type: 'Travel', amount: 0 },
  { type: 'Clothes', amount: 0 },
  { type: 'Shopping', amount: 0 },
  { type: 'Entertainment', amount: 0 },
];

export const resetCategories = () => {
  incomeCategories.forEach((c) => (c.amount = 0));
  expenseCategories.forEach((c) => (c.amount = 0));
};

export const types = {
  Income: 'Income',
  Expense: 'Expense',
};
