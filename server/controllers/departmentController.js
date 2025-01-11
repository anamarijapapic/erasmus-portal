const mongoose = require('mongoose');
const checkExistingModel = require('../utils/helpers.js');
const Department = require('../models/department.model.js');
const User = require('../models/user.model');
const Institution = require('../models/institution.model.js');

const getAllDepartments = async (req, res) => {
  try {
    const institutionId = req.query.institutionId;
    const country = req.query.country;

    const filter = {};

    if (institutionId) {
      filter.institutionId = institutionId;
    }

    if (country) {
      const institutions = await Institution.find({ country }).lean();
      const institutionIds = institutions.map((institution) => institution._id);
      filter.institutionId = { $in: institutionIds };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPages = Math.ceil(
      (await Department.countDocuments(filter).lean()) /
        (parseInt(req.query.limit) || 10)
    );
    const skip = (page - 1) * limit;

    const departments = await Department.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({ departments, page, totalPages });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching departments', error: error.message });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await checkExistingModel(Department, id);

    if (!department) {
      return res.status(404).json({ message: 'No department present' });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { contactPersonId, institutionId } = req.body;

    await checkExistingModel(User, contactPersonId);
    await checkExistingModel(Institution, institutionId);

    const department = await Department.create(req.body);

    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { contactPersonId, institutionId } = req.body;

    if (contactPersonId) {
      await checkExistingModel(User, contactPersonId);
    }

    if (institutionId) {
      await checkExistingModel(Institution, institutionId);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const department = await Department.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: 'No department present' });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const department = await Department.findOneAndDelete({ _id: id });

    if (!department) {
      return res.status(404).json({ message: 'No department present' });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
