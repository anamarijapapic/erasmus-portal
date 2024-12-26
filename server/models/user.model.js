const mongoose = require('mongoose');
const roles = require('../enums/roles.js');

const userSchema = new mongoose.Schema({
  //   firstName: {
  //     type: String,
  //     required: true,
  //   },
  //   lastName: {
  //     type: String,
  //     required: true,
  //   },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   dob: {
  //     type: Date,
  //     required: true,
  //   },
  //   semester: {
  //     type: Number,
  //     required: true,
  //   },
  //   yearOfStudy: {
  //     type: Number,
  //     required: true,
  //   },
  //   placeOfBirth: {
  //     type: String,
  //     required: true,
  //   },
  //   citizenship: {
  //     type: String,
  //     required: true,
  //   },
  //   pinOIB: {
  //     type: String,
  //     required: true,
  //   },
  //   idCard: {
  //     type: String,
  //     required: true,
  //   },
  //   gender: {
  //     type: String,
  //     required: true,
  //   },
  //   addressInfo: {
  //     type: String,
  //     required: true,
  //   },
  //   contactNumber: {
  //     type: String,
  //     unique: true,
  //   },
  //   role: {
  //     type: String,
  //     enum: Object.values(roles),
  //     default: roles.Student,
  //     required: true,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
