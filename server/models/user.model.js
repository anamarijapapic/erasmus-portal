const mongoose = require('mongoose');
const genders = require('../enums/genders.js');
const roles = require('../enums/roles.js');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(genders),
      default: genders.Male,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    citizenship: {
      type: String,
      required: true,
    },
    pinOIB: {
      type: String,
      required: true,
      unique: true,
    },
    idCardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      unique: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    yearOfStudy: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.Student,
    },
    studyProgrammeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudyProgramme',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.pre(['find', 'findOne'], function (next) {
  this.populate({
    path: 'studyProgrammeId',
    populate: {
      path: 'departmentId',
      populate: {
        path: 'institutionId',
      },
    },
  });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
