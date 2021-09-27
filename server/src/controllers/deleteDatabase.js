import mongoose from 'mongoose';
import { db } from '../config/db.js';

export async function dropRefreshTokens(req, res) {
  try {
    const conn = await mongoose.createConnection(process.env.MONGODB);
    await conn.dropCollection('refreshtokens');
    const refreshTokens = await db.RefreshToken.find();
    res.status(200).json({ message: 'Tokens are deleted.', refreshTokens });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export async function dropAccounts(req, res) {
  try {
    const conn = await mongoose.createConnection(process.env.MONGODB);
    await conn.dropCollection('accounts');
    const accounts = await db.Account.find();
    res.status(200).json({ message: 'Accounts are deleted.', accounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
