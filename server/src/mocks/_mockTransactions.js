// third party
import faker from 'faker';

const incomeCategories = [
  { type: 'Business', amount: 0 },
  { type: 'Investments', amount: 0 },
  { type: 'Extra income', amount: 0 },
  { type: 'Deposits', amount: 0 },
  { type: 'Lottery', amount: 0 },
  { type: 'Gifts', amount: 0 },
  { type: 'Salary', amount: 0 },
  { type: 'Savings', amount: 0 },
  { type: 'Rental income', amount: 0 },
];
const expenseCategories = [
  { type: 'Bills', amount: 0 },
  { type: 'Car', amount: 0 },
  { type: 'Clothes', amount: 0 },
  { type: 'Travel', amount: 0 },
  { type: 'Food', amount: 0 },
  { type: 'Shopping', amount: 0 },
  { type: 'House', amount: 0 },
  { type: 'Entertainment', amount: 0 },
  { type: 'Phone', amount: 0 },
  { type: 'Pets', amount: 0 },
  { type: 'Other', amount: 0 },
];

export const types = {
  Income: 'Income',
  Expense: 'Expense',
};
const TYPES = Object.values(types);

const INCOMECATEGORIES = Object.values(incomeCategories);

const EXPENSECATEGORIES = Object.values(expenseCategories);

export const MOCK_TRANSACTIONS = [];

for (let i = 0; i < 50000; i++) {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const category = type === types.Income ? INCOMECATEGORIES : EXPENSECATEGORIES;
  MOCK_TRANSACTIONS[i] = {
    type: type,
    category: category[Math.floor(Math.random() * category.length)].type,
    amount: faker.finance.amount(),
    date: faker.date.between('2015-01-01', '2023-05-01').toISOString(),
    created: faker.date.between('2015-01-01', '2023-05-01').toISOString(),
  };
}
