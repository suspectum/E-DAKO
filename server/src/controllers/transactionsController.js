import { transactionService } from '../services/transactionService.js';

export function createTransaction(req, res, next) {
  transactionService
    .createTransaction(req.user.id, req.body)
    .then((transaction) => {
      res.json(transaction);
    })
    .catch(next);
}

export function getTransactions(req, res, next) {
  transactionService
    .getTransactions(req.user.id, req.query)
    .then((transactions) => {
      res.json(transactions);
    })
    .catch(next);
}

export function updateTransaction(req, res, next) {
  transactionService
    .updateTransaction(req.params.id, req.body)
    .then((transaction) => {
      res.json(transaction);
    })
    .catch(next);
}

export function deleteTransaction(req, res, next) {
  transactionService
    .deleteTransaction(req.params.id)
    .then(() => res.json({ message: 'Transaction deleted successfully' }))
    .catch(next);
}

export function getTransactionsSum(req, res, next) {
  transactionService
    .getTransactionsSum(req.user.id, req.query)
    .then((transactions) => {
      res.json(transactions);
    })
    .catch(next);
}
