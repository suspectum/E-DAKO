import { Router } from 'express';
const router = Router();

import { Role } from '../config/role.js';
import { authorize } from '../middlewares/authorize.js';
import { firebaseAuthorize } from '../middlewares/firebaseAuthorize.js';

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
} from '../middlewares/validateSchema.js';
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
  firebaseAuth,
} from '../controllers/accountController.js';

router.post('/register', registerSchema, register);
router.post('/verify-email', verifyEmailSchema, verifyEmail);
router.post('/authenticate', authenticateSchema, authenticate);
router.get('/authenticate-firebase', firebaseAuthorize, firebaseAuth);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/user/:id', authorize(), getById);
router.put('/user/:id', authorize(), updateSchema, update);
router.delete('/user/:id', authorize(), _delete);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.get('/users', authorize(Role.Admin), getAll);
router.post('/', authorize(Role.Admin), createSchema, create);
router.get('/refresh-tokens/:id', authorize(), getActiveTokensById);
// TODO add revoke all active refresh tokens for user

export default router;
