const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = require('../enums/types');
const StudyProgramme = require('../models/studyProgramme.model');
const Institution = require('../models/institution.model');
const checkExistingModel = require('../utils/helpers.js');

const mobilitySchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(types),
      default: types.Studijski,
    },
    homeInstitutionId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Institution',
    },
    hostStudyProgrammeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'StudyProgramme',
    },
    numberOfStudentsOrStaff: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    homeApplicationDeadline: {
      type: Date,
      required: true,
    },
    nominationDeadline: {
      type: Date,
      required: true,
    },
    hostApplicationDeadline: {
      type: Date,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const checkHostAndHomeInstitutionConflict = async (
  hostStudyProgrammeId,
  homeInstitutionId
) => {
  const hostStudyProgramme = await StudyProgramme.findById(hostStudyProgrammeId)
    .populate({
      path: 'departmentId',
      populate: {
        path: 'institutionId',
      },
    })
    .lean();
  if (
    hostStudyProgramme.departmentId.institutionId._id.toString() ===
    homeInstitutionId.toString()
  ) {
    throw new Error(
      'Host study programme cannot belong to the same institution as the home institution.'
    );
  }
};

const validateHostAndHomeConflict = async (doc) => {
  if (doc.hostStudyProgrammeId && doc.homeInstitutionId) {
    await checkHostAndHomeInstitutionConflict(
      doc.hostStudyProgrammeId,
      doc.homeInstitutionId
    );
  }

  if (doc.hostStudyProgrammeId) {
    await checkExistingModel(StudyProgramme, doc.hostStudyProgrammeId);

    const hostStudyProgramme = await StudyProgramme.findById(
      doc.hostStudyProgrammeId
    ).populate({
      path: 'departmentId',
      populate: {
        path: 'institutionId',
      },
    });

    if (!doc.homeInstitutionId) {
      doc.homeInstitutionId = hostStudyProgramme.departmentId.institutionId._id;
    } else {
      await checkHostAndHomeInstitutionConflict(
        doc.hostStudyProgrammeId,
        doc.homeInstitutionId
      );
    }
  }

  if (doc.homeInstitutionId) {
    await checkExistingModel(Institution, doc.homeInstitutionId);

    if (doc.hostStudyProgrammeId) {
      await checkHostAndHomeInstitutionConflict(
        doc.hostStudyProgrammeId,
        doc.homeInstitutionId
      );
    }
  }
};

mobilitySchema.pre('save', async function (next) {
  try {
    console.log('Pre-save hook called!');
    if (
      this.isModified('hostStudyProgrammeId') ||
      this.isModified('homeInstitutionId')
    ) {
      await validateHostAndHomeConflict(this);
    }
    next();
  } catch (error) {
    next(error);
  }
});

mobilitySchema.pre('findOneAndUpdate', async function (next) {
  try {
    console.log('Pre-findOneAndUpdate hook called!');
    const update = this.getUpdate();

    const query = this.getQuery();
    const id = query._id || query.id;

    if (!id) {
      throw new Error('ID not provided in query');
    }
    const mobility = await Mobility.findById(id);

    const updatedDoc = {
      hostStudyProgrammeId:
        update.hostStudyProgrammeId || mobility.hostStudyProgrammeId,
      homeInstitutionId: update.homeInstitutionId || mobility.homeInstitutionId,
    };

    if (updatedDoc.hostStudyProgrammeId || updatedDoc.homeInstitutionId) {
      await validateHostAndHomeConflict(updatedDoc);
    }

    next();
  } catch (error) {
    next(error);
  }
});

mobilitySchema.pre(['find', 'findOne'], function (next) {
  this.populate([
    {
      path: 'homeInstitutionId',
      model: 'Institution',
    },
    {
      path: 'hostStudyProgrammeId',
      model: 'StudyProgramme',
      populate: [
        {
          path: 'departmentId',
          model: 'Department',
          populate: [
            {
              path: 'contactPersonId',
              model: 'User',
            },
            {
              path: 'institutionId',
              model: 'Institution',
            },
          ],
        },
        {
          path: 'subjectAreaId',
          model: 'SubjectArea',
        },
      ],
    },
  ]);
  next();
});

const Mobility = mongoose.model('Mobility', mobilitySchema);

module.exports = Mobility;
