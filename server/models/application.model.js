const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statuses = require('../enums/statuses.js');

const applicationSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    // mobilityId: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    //   ref: 'Mobility',
    // },
    status: {
      type: String,
      enum: Object.values(statuses),
      default: statuses.Prijavljeno,
    },
    rating: {
      type: Schema.Types.Double,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
