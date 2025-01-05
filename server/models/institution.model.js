const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    erasmusCode: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    contactPersonId: { type: mongoose.Types.ObjectId, ref: 'User' },
    addressInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
