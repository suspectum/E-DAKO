import faker from 'faker';

// project imports
import { incomeCategories, expenseCategories, types } from 'constants/categories';

const TYPES = Object.values(types);

const INCOMECATEGORIES = Object.values(incomeCategories);

const EXPENSECATEGORIES = Object.values(expenseCategories);

export function MOCK_TRANSACTIONS() {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const category = type === types.Income ? INCOMECATEGORIES : EXPENSECATEGORIES;

  return {
    type: type,
    category: category[Math.floor(Math.random() * category.length)].type,
    amount: faker.finance.amount(),
    date: faker.date.past().toLocaleDateString('en-US'),
  };
}
