const mongoose = require('mongoose');
const Application = require('../models/application.model.js');
const User = require('../models/user.model.js');
const Mobility = require('../models/mobility.model.js');
const checkExistingModel = require('../utils/helpers.js');

const getAllApplications = async (req, res) => {
  try {
    const mobilityId = req.query.mobilityId;
    const status = req.query.status;
    const role = req.query.role;

    let filter = {};

    if (status) {
      filter.status = status;
    }
    if (mobilityId) {
      filter.mobilityId = mobilityId;
    }

    if (role) {
      const userIds = await User.find({
        role: role,
      })
        .select('_id')
        .lean();

      filter.userId = { $in: userIds };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPages = Math.ceil(
      (await Application.countDocuments(filter).lean()) /
        (parseInt(req.query.limit) || 10)
    );
    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({ applications, page, totalPages });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching applications', error: error.message });
  }
};

const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await checkExistingModel(Application, id);

    if (!application) {
      return res.status(404).json({ message: 'No application present' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createApplication = async (req, res) => {
  // provjeriti postoji li vec aplikacija korisnika na tu mobilnost?
  try {
    const { userId, mobilityId } = req.body;
    await checkExistingModel(User, userId);
    await checkExistingModel(Mobility, mobilityId);

    const application = await Application.create(req.body);

    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const application = await Application.findOneAndDelete({ _id: id });

    if (!application) {
      return res.status(404).json({ message: 'No application present' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, mobilityId } = req.body;

    if (userId) {
      await checkExistingModel(User, userId);
    }

    if (mobilityId) {
      await checkExistingModel(Mobility, mobilityId);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Id is not valid' });
    }

    const application = await Application.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'No application present' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
