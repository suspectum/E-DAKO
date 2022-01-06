import express from 'express';
const router = express.Router();

import { authorize } from '../middlewares/authorize.js';

import { createTransactionSchema, updateTransactionSchema } from '../middlewares/validateSchema.js';
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionsSum,
} from '../controllers/transactionsController.js';

router.post('/', authorize(), createTransactionSchema, createTransaction);
router.get('/filter/', authorize(), getTransactions);
router.put('/:id', authorize(), updateTransactionSchema, updateTransaction);
router.delete('/:id', authorize(), deleteTransaction);
router.get('/', authorize(), getTransactionsSum);

export default router;
