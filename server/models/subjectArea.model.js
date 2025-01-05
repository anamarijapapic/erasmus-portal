const mongoose = require('mongoose');

const subjectAreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const SubjectArea = mongoose.model('SubjectArea', subjectAreaSchema);

module.exports = SubjectArea;
