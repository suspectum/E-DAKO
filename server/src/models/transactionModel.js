import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  created: { type: Date, default: Date.now },
  updated: Date,
});

schema.set('toJSON', {
  virtuals: true, // id : copy of _id
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

export const transactionModel = mongoose.model('Transaction', schema);
