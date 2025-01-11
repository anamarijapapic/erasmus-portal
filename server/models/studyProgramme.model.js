const mongoose = require('mongoose');

const studyProgrammeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    subjectAreaId: {
      type: mongoose.Types.ObjectId,
      ref: 'SubjectArea',
      required: true,
    },
    academicEqfLevel: {
      type: String,
      required: true,
      enum: [
        'Level 1',
        'Level 2',
        'Level 3',
        'Level 4',
        'Level 5',
        'Level 6',
        'Level 7',
        'Level 8',
      ],
    },
  },
  { timestamps: true }
);

studyProgrammeSchema.pre(['find', 'findOne'], function (next) {
  this.populate({
    path: 'departmentId',
    populate: {
      path: 'institutionId',
    },
  }).populate('subjectAreaId');

  next();
});

const StudyProgramme = mongoose.model('StudyProgramme', studyProgrammeSchema);

module.exports = StudyProgramme;
