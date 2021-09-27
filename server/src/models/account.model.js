import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  acceptTerms: Boolean,
  role: { type: String, required: true },
  verificationToken: String,
  verified: Date,
  resetToken: {
    token: String,
    expires: Date,
  },
  passwordReset: Date,
  created: { type: Date, default: Date.now },
  updated: Date,
});

schema.virtual('isVerified').get(function () {
  return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
  virtuals: true, // id : copy of _id
  versionKey: false,
  transform: function (doc, ret) {
    console.log('asd');
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

export default mongoose.model('Account', schema);
