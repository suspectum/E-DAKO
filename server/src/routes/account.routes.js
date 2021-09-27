import express from 'express';
const router = express.Router();

import { dropAccounts, dropRefreshTokens } from '../controllers/deleteDatabase.js';
router.post('/drop-accounts', dropAccounts);
router.post('/drop-refresh-tokens', dropRefreshTokens);

import authorize from '../middlewares/authorize.js';
import Role from '../config/role.js';

import {
  registerSchema,
  verifyEmailSchema,
  authenticateSchema,
  forgotPasswordSchema,
  validateResetTokenSchema,
  resetPasswordSchema,
  updateSchema,
  revokeTokenSchema,
  createSchema,
} from '../middlewares/validate-schema.js';
import {
  register,
  verifyEmail,
  authenticate,
  refreshToken,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getById,
  update,
  _delete,
  revokeToken,
  getAll,
  create,
  getActiveTokensById,
} from '../controllers/accounts.controller.js';

router.post('/register', registerSchema, register);
router.post('/verify-email', verifyEmailSchema, verifyEmail);
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.get('/', authorize(Role.Admin), getAll);
router.post('/', authorize(Role.Admin), createSchema, create);

//for me
router.get('/refresh-tokens/:id', authorize(), getActiveTokensById);

export default router;
