import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// crypto from nodejs
import crypto from 'crypto';

import { db } from '../config/db.js';
import { Role } from '../config/role.js';
import { sendEmail } from '../config/sendEmail.js';

const secret = process.env.SECRET;
const JWT_LIFE = process.env.JWT_LIFE;
const REFRESH_TOKEN_COOKIE_LIFE = eval(process.env.REFRESH_TOKEN_COOKIE_LIFE);

export const accountService = {
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
};

async function register(params, origin) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    // send already registered error in email to prevent account enumeration
    return await sendAlreadyRegisteredEmail(params.email, origin);
  }

  // create account object
  const account = new db.Account(params);

  // first registered account is an admin
  const isFirstAccount = (await db.Account.countDocuments({})) === 0;
  account.role = isFirstAccount ? Role.Admin : Role.User;
  account.verificationToken = randomTokenString();

  // hash password
  account.passwordHash = hash(params.password);

  // save account
  await account.save();

  // send email
  await sendVerificationEmail(account, origin);
}

async function firebaseAuth(userInfo, ipAddress) {
  let account;
  account = await db.Account.findOne({ email: userInfo.email });

  if (!account) {
    const { name, email } = userInfo;
    const params = {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      email,
      password: ' ',
      role: Role.User,
      verified: Date.now(),
    };

    // create account object
    account = new db.Account(params);

    // first registered account is an admin
    const isFirstAccount = (await db.Account.countDocuments({})) === 0;
    account.role = isFirstAccount ? Role.Admin : Role.User;

    // hash password
    account.passwordHash = hash(params.password);

    // save account
    await account.save();
  }
  const jwtToken = generateJwtToken(account);
  const refreshToken = generateRefreshToken(account, ipAddress);

  // save refresh token
  await refreshToken.save();
  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

async function verifyEmail({ token }) {
  const account = await db.Account.findOne({ verificationToken: token });

  if (!account) throw 'Verification failed';

  account.verified = Date.now();
  account.verificationToken = undefined;
  await account.save();
}

async function authenticate(email, password, ipAddress) {
  const account = await db.Account.findOne({ email });

  if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
    throw 'Email or password is incorrect';
  } else if (!account.isVerified) {
    throw 'Please verify your email';
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(account);
  const refreshToken = generateRefreshToken(account, ipAddress);

  // save refresh token
  await refreshToken.save();
  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

async function refreshToken(token, ipAddress) {
  const refreshToken = await getRefreshToken(token);
  const { account } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(account, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(account);

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
}

async function forgotPassword({ email }, origin) {
  const account = await db.Account.findOne({ email });

  // always return ok response to prevent email enumeration
  if (!account) return;

  // create reset token that expires after 24 hours
  account.resetToken = {
    token: randomTokenString(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  await account.save();

  // send email
  await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }) {
  const account = await db.Account.findOne({
    'resetToken.token': token,
    'resetToken.expires': { $gt: Date.now() },
  });

  if (!account) throw 'Invalid token';
}

async function resetPassword({ token, password }) {
  const account = await db.Account.findOne({
    'resetToken.token': token,
    'resetToken.expires': { $gt: Date.now() },
  });

  if (!account) throw 'Invalid token';
  // update password and remove reset token
  account.passwordHash = hash(password);
  account.passwordReset = Date.now();
  account.resetToken = undefined;
  await account.save();
}

async function getById(id) {
  const account = await getAccount(id);
  return basicDetails(account);
}

async function update(id, params) {
  const account = await getAccount(id);

  // validate (if email was changed)
  if (
    params.email &&
    account.email !== params.email &&
    (await db.Account.findOne({ email: params.email }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.passwordHash = hash(params.password);
  }

  // copy params to account and save
  Object.assign(account, params);
  account.updated = Date.now();
  await account.save();

  return basicDetails(account);
}

async function _delete(id) {
  const account = await getAccount(id);

  await account.remove();
  await db.Transaction.deleteMany({ account: id });
}

async function revokeToken(token, ipAddress) {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}

async function getAll() {
  const accounts = await db.Account.find();
  return accounts.map((x) => basicDetails(x));
}

async function create(params) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const account = new db.Account(params);
  account.verified = Date.now();

  // hash password
  account.passwordHash = hash(params.password);

  // save account
  await account.save();

  return basicDetails(account);
}

async function getActiveTokensById(id) {
  const refreshTokens = await getRefreshTokensById(id);

  const res = refreshTokens.filter(({ token }) => token).map(({ token }) => token);
  return res;
}

//================================|| HELPER FUNCTIONS ||================================//

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ sub: account.id, id: account.id }, secret, { expiresIn: JWT_LIFE });
}

function generateRefreshToken(account, ipAddress) {
  // create a refresh token that expires in 7 days
  return new db.RefreshToken({
    account: account.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + REFRESH_TOKEN_COOKIE_LIFE),
    createdByIp: ipAddress,
  });
}

async function getRefreshToken(token) {
  const refreshToken = await db.RefreshToken.findOne({ token }).populate('account');
  if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
  return refreshToken;
}

async function getRefreshTokensById(id) {
  if (!db.isValidId(id)) throw 'Account not found';
  const refreshTokens = await db.RefreshToken.find({ account: id, revoked: { $exists: false } });
  //no need for check errors, returns empty array
  return refreshTokens;
}

async function getAccount(id) {
  if (!db.isValidId(id)) throw 'Account not found';
  const account = await db.Account.findById(id);
  if (!account) throw 'Account not found';
  return account;
}

function basicDetails(account) {
  const { id, firstName, lastName, email, role, created, updated, isVerified } = account;
  return { id, firstName, lastName, email, role, created, updated, isVerified };
}

//================================|| EMAIL FUNCTIONS ||================================//

async function sendAlreadyRegisteredEmail(email, origin) {
  let message;
  if (origin) {
    message = `<p>If you don't know your password please visit the <a href="${origin}/forgot-password">forgot password</a> page.</p>`;
  } else {
    message = `<p>If you don't know your password you can reset it via the <code>/forgot-password</code> api route.</p>`;
  }

  await sendEmail({
    to: email,
    subject: 'E-DAKO - Email Already Registered',
    html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
  });
}

async function sendVerificationEmail(account, origin) {
  let message;
  if (origin) {
    const verifyUrl = `${origin}/verify-email?token=${account.verificationToken}`;
    message = `<p>Please click the below link to verify your email address:</p>
                     <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/verify-email</code> api route:</p>
                     <p><code>${account.verificationToken}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: 'E-DAKO - Verify Email',
    html: `<h4>Verify Email</h4>
                 <p>Thanks for registering!</p>
                 ${message}`,
  });
}

async function sendPasswordResetEmail(account, origin) {
  let message;
  if (origin) {
    const resetUrl = `${origin}/reset-password?token=${account.resetToken.token}`;
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: 'E-DAKO - Reset Password',
    html: `<h4>Reset Password Email</h4>
               ${message}`,
  });
}
// ====================== email functions ====================== //
