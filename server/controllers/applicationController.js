const mongoose = require('mongoose');
const Application = require('../models/application.model.js');
const User = require('../models/user.model.js');
const Mobility = require('../models/mobility.model.js');
const checkExistingModel = require('../utils/helpers.js');
const { getBucket } = require('../config/database.js');
const {
  getFilesByApplicationId,
  deleteFileById,
  uploadFileToApplication,
} = require('../utils/fileUtils.js');

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

    const applicationsWithFiles = await Promise.all(
      applications.map(async (application) => {
        const files = await getFilesByApplicationId(application._id);

        return {
          ...application,
          files,
        };
      })
    );

    res.status(200).json({ applicationsWithFiles, page, totalPages });
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

    const files = await getFilesByApplicationId(application._id);

    res.status(200).json({
      application,
      files,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createApplication = async (req, res, next) => {
  const { userId, mobilityId } = req.body;

  try {
    await checkExistingModel(User, userId);
    await checkExistingModel(Mobility, mobilityId);

    const application = await Application.create({
      userId,
      mobilityId,
      status: req.body.status,
      rating: req.body.rating,
    });

    let uploadedFiles = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (!file || !file.buffer) {
          throw new Error('Invalid file or missing buffer');
        }

        const uploadedFile = await uploadFileToApplication(
          file,
          application._id
        );
        uploadedFiles.push(uploadedFile);
      }
    }

    res.status(200).json({
      message: 'Application created successfully',
      files: uploadedFiles,
      application: application,
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: error.message });
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

    const files = await getFilesByApplicationId(application._id);

    if (files.length > 0) {
      for (const file of files) {
        await deleteFileById(file._id);
      }
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

const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const bucket = getBucket();

    const file = await mongoose.connection.db
      .collection('files.files')
      .findOne({ _id: new mongoose.Types.ObjectId(`${id}`) });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const downloadStream = bucket.openDownloadStream(file._id);

    res.setHeader(
      'Content-Type',
      file.metadata.fileType || 'application/octet-stream'
    );
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteFileById(id);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: error.message });
  }
};

const uploadFile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const existingFiles = await mongoose.connection.db
      .collection('files.files')
      .find({ 'metadata.applicationId': application._id })
      .toArray();

    if (existingFiles.length >= 5) {
      return res.status(400).json({
        message: 'You can only upload up to 5 files for this application',
      });
    }

    if (req.file) {
      if (!req.file || !req.file.buffer) {
        return res
          .status(400)
          .json({ message: 'Invalid file or missing buffer' });
      }

      const uploadedFile = await uploadFileToApplication(
        req.file,
        application._id
      );

      res.status(200).json({
        message: 'File uploaded successfully.',
        uploadedFile,
      });
    } else {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  downloadFile,
  deleteFile,
  uploadFile,
};
