import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // const conne = await mongoose.createConnection(process.env.MONGODB);
    // await conne.dropCollection("refreshtokens");
    const conn = await mongoose.connect(process.env.MONGODB);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;

import accountModel from '../models/account.model.js';
import refreshTokenModel from '../models/refresh-token.model.js';

export const db = {
  Account: accountModel,
  RefreshToken: refreshTokenModel,
  isValidId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
