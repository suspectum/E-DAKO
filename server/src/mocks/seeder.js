import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// project imports
import { connectDB } from '../config/db.js';
import { MOCK_TRANSACTIONS } from './_mockTransactions.js';
import { MOCK_USERS } from './_mockUsers.js';

import { accountModel } from '../models/accountModel.js';
import { refreshTokenModel } from '../models/refreshTokenModel.js';
import { transactionModel } from '../models/transactionModel.js';

dotenv.config();

connectDB();

let users;
let transactions;

const importData = async () => {
  users = MOCK_USERS;
  transactions = MOCK_TRANSACTIONS;

  const keepThisUserEmail = 'johndoe@example.com';
  const keepThisUserId = '61a27a9c69ea6b00c06476de';

  try {
    await accountModel.deleteMany({ email: { $ne: keepThisUserEmail } });
    await transactionModel.deleteMany();

    await accountModel.insertMany(users);

    const sampleTransactions = transactions.map((transaction) => {
      return { ...transaction, account: keepThisUserId };
    });

    await transactionModel.insertMany(sampleTransactions);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await accountModel.deleteMany({ email: { $ne: keepThisUserEmail } });
    await transactionModel.deleteMany();
    await refreshTokenModel.deleteMany();

    console.log('Data Removed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
