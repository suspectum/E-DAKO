import { firebaseAdmin } from '../config/firebaseService.js';

export async function firebaseAuthorize(req, res, next) {
  if (req.headers.authorization) {
    const authToken = req.headers.authorization.split(' ')[1];
    const userInfo = await firebaseAdmin.auth().verifyIdToken(authToken);
    req.userInfo = userInfo;
    next();
  }
}
