const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactPersonId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    institutionId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Institution',
    },
  },
  { timestamps: true }
);

departmentSchema.pre(['find', 'findOne'], function (next) {
  this.populate('contactPersonId').populate({
    path: 'institutionId',
    populate: {
      path: 'contactPersonId',
    },
  });
  next();
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
