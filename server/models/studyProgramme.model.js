const mongoose = require('mongoose');

const studyProgrammeSchema = new mongoose.Schema(
  {
    departmentId: { type: String, required: true },
    subjectAreaId: { type: mongoose.Types.ObjectId, ref: 'SubjectArea' },
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

const StudyProgramme = mongoose.model('StudyProgramme', studyProgrammeSchema);

module.exports = StudyProgramme;
