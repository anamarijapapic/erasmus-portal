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
    contactPersonId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

institutionSchema.pre(['find', 'findOne'], function (next) {
  this.populate('contactPersonId');
  next();
});

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
