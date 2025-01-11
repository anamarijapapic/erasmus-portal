const mongoose = require('mongoose');
const { getBucket } = require('../config/database.js');

const getFilesByApplicationId = async (applicationId) => {
  const files = await mongoose.connection.db
    .collection('files.files')
    .find({
      'metadata.applicationId': applicationId,
    })
    .toArray();

  return files;
};

const deleteFileById = async (fileId) => {
  const bucket = getBucket();

  const file = await mongoose.connection.db
    .collection('files.files')
    .findOne({ _id: new mongoose.Types.ObjectId(fileId) });

  if (!file) {
    throw new Error('File not found');
  }

  await bucket.delete(file._id);
};

const uploadFileToApplication = async (file, applicationId) => {
  const bucket = getBucket();

  const uploadStream = bucket.openUploadStream(file.originalname, {
    metadata: {
      applicationId: applicationId,
      fileType: file.mimetype,
    },
  });

  uploadStream.end(file.buffer);

  return new Promise((resolve, reject) => {
    uploadStream.on('finish', () => {
      resolve({
        fileId: uploadStream.id,
        fileName: file.originalname,
        fileType: file.mimetype,
      });
    });

    uploadStream.on('error', (err) => {
      reject(new Error('Failed to upload file to GridFS'));
    });
  });
};

module.exports = {
  getFilesByApplicationId,
  deleteFileById,
  uploadFileToApplication,
};
