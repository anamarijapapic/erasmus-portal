const mongoose = require('mongoose');
const Mobility = require('../models/mobility.model');
const Institution = require('../models/institution.model');
const StudyProgramme = require('../models/studyProgramme.model');
const Department = require('../models/department.model');
const checkExistingModel = require('../utils/helpers.js');

const getAllMobilities = async (req, res) => {
  try {
    const {
      homeInstitutionId,
      hostInstitutionId,
      type,
      studyProgrammeId,
      season,
      sortBy,
      order,
    } = req.query;

    const filter = {};

    if (homeInstitutionId) {
      filter.homeInstitutionId = homeInstitutionId;
    }

    if (type) {
      filter.type = type;
    }

    if (season) {
      filter.season = season;
    }

    if (hostInstitutionId) {
      const departments = await Department.find({
        institutionId: hostInstitutionId,
      })
        .select('_id')
        .lean();

      const departmentIds = departments.map((dept) => dept._id);

      const studyProgrammes = await StudyProgramme.find({
        departmentId: { $in: departmentIds },
      })
        .select('_id')
        .lean();

      const studyProgrammeIds = studyProgrammes.map((prog) => prog._id);

      filter.hostStudyProgrammeId = { $in: studyProgrammeIds };
    }

    if (studyProgrammeId) {
      filter.hostStudyProgrammeId = studyProgrammeId;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPages = Math.ceil(
      (await Mobility.countDocuments(filter)) / limit
    );

    const sortField = sortBy || 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    const mobilities = await Mobility.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean();

    res.status(200).json({ mobilities, page, totalPages });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching mobilities',
      error: error.message,
    });
  }
};

const getMobility = async (req, res) => {
  try {
    const { id } = req.params;

    const mobility = await checkExistingModel(Mobility, id);

    if (!mobility) {
      return res.status(404).json({ message: 'No mobility present' });
    }

    res.status(200).json(mobility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMobility = async (req, res) => {
  try {
    const { hostStudyProgrammeId, homeInstitutionId } = req.body;

    await checkExistingModel(StudyProgramme, hostStudyProgrammeId);
    await checkExistingModel(Institution, homeInstitutionId);

    const mobility = await Mobility.create(req.body);

    res.status(200).json(mobility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteMobility = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const mobility = await Mobility.findOneAndDelete({ _id: id });

    if (!mobility) {
      return res.status(404).json({ message: 'No mobility present' });
    }

    res.status(200).json(mobility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateMobility = async (req, res) => {
  try {
    const { id } = req.params;
    const { hostStudyProgrammeId, homeInstitutionId } = req.body;

    if (hostStudyProgrammeId) {
      await checkExistingModel(StudyProgramme, hostStudyProgrammeId);
    }

    if (homeInstitutionId) {
      await checkExistingModel(Institution, homeInstitutionId);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const mobility = await Mobility.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!mobility) {
      return res.status(404).json({ message: 'No mobility present' });
    }

    res.status(200).json(mobility);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllMobilities,
  getMobility,
  createMobility,
  deleteMobility,
  updateMobility,
};
