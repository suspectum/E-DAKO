import jwt from 'express-jwt';

import { db } from '../config/db.js';

const secret = process.env.SECRET;

export function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ['HS256'] }),

    // authorize based on user role
    async (req, res, next) => {
      const account = await db.Account.findById(req.user.id);

      // account no longer exists or role not authorized
      if (!account || (roles.length && !roles.includes(account.role))) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const refreshTokens = await db.RefreshToken.find({ account: account.id });

      // authentication and authorization successful
      req.user.role = account.role;
      req.user.ownsToken = (token) => !!refreshTokens.find((x) => x.token === token);
      next();
    },
  ];
}

// example req.user
// user: {
//   sub: '614f5783e6931b9ac2c74f8d',
//   id: '614f5783e6931b9ac2c74f8d',
//   iat: 1634150440,
//   exp: 1634151340,
//   role: 'Admin',
//   ownsToken: [Function (anonymous)]
// },
