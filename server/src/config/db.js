import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

import { accountModel } from '../models/accountModel.js';
import { refreshTokenModel } from '../models/refreshTokenModel.js';
import { transactionModel } from '../models/transactionModel.js';

export const db = {
  Account: accountModel,
  RefreshToken: refreshTokenModel,
  Transaction: transactionModel,
  isValidId,
  ObjectId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function ObjectId(id) {
  return mongoose.Types.ObjectId(id);
}
