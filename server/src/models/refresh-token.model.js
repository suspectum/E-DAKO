import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

schema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires;
});

schema.virtual('isRevoked').get(function () {
  return this.revoked;
});

schema.virtual('isActive').get(function () {
  return !this.revoked && !this.isExpired;
});

export default mongoose.model('RefreshToken', schema);
