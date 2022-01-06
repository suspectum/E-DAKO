import { db } from '../config/db.js';

export const transactionService = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionsSum,
};

async function createTransaction(id, params) {
  const transaction = new db.Transaction(params);
  transaction.account = id;
  await transaction.save();

  return transaction;
}

async function getTransactions(id, { limit, start, end }) {
  let transactions;
  if (limit !== 'undefined') {
    return (transactions = await getTransactionsByLimit(id, limit));
  } else {
    return (transactions = await getTransactionsByDate(id, new Date(start), new Date(end)));
  }
}

async function updateTransaction(id, params) {
  const transaction = await getTransactionById(id);
  Object.assign(transaction, params);
  transaction.updated = Date.now();
  await transaction.save();

  return transaction;
}

async function deleteTransaction(id) {
  const transaction = await getTransactionById(id);
  await transaction.remove();
}

async function getTransactionsSum(id, { type }) {
  const transactions = await groupTransactions(id, type);
  return transactions;
}

//================================|| HELPER FUNCTIONS ||================================//

async function getTransactionById(id) {
  if (!db.isValidId(id)) throw 'Transaction not found';
  const transaction = await db.Transaction.findById(id);
  if (!transaction) throw 'Transaction not found';
  return transaction;
}

async function getTransactionsByLimit(id, limit) {
  if (!db.isValidId(id)) throw 'Account not found';
  const transactions = await db.Transaction.aggregate([
    { $match: { account: db.ObjectId(id) } },
    { $sort: { created: -1 } },
    { $limit: Number(limit) },
    // global schema.set('toJSON... mothod doesn't apply
    // to documents from an aggregation pipeline
    { $addFields: { id: '$_id' } },
    { $unset: ['_id'] },
    { $unset: ['__v'] },
  ]);
  return transactions;
}

async function getTransactionsByDate(id, start, end) {
  if (!db.isValidId(id)) throw 'Account not found';
  const transactions = await db.Transaction.aggregate([
    {
      $match: {
        account: db.ObjectId(id),
        date: {
          $gte: start,
          $lte: end,
        },
      },
    },
    { $sort: { date: -1 } },
    // global schema.set('toJSON... mothod doesn't apply
    // to documents from an aggregation pipeline
    { $addFields: { id: '$_id' } },
    { $unset: ['_id'] },
    { $unset: ['__v'] },
  ]);
  return transactions;
}

async function groupTransactions(id, type) {
  if (!db.isValidId(id)) throw 'Account not found';
  const transactions = await db.Transaction.aggregate([
    {
      $match: {
        account: db.ObjectId(id),
        type: type,
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$date',
          },
          month: {
            $month: '$date',
          },
        },
        amount: {
          $sum: '$amount',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    // global schema.set('toJSON... mothod doesn't apply
    // to documents from an aggregation pipeline
    { $addFields: { id: '$_id' } },
    { $unset: ['_id'] },
    { $unset: ['__v'] },
  ]);
  return transactions;
}
