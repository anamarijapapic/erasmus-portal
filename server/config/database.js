const mongoose = require('mongoose');
require('dotenv-safe').config();

let bucket;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    return;
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB Connection Established');
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB Connection Lost. Reconnecting...');
  });

  mongoose.connection.on('open', () => {
    console.log('MongoDB Connection Open and Ready to Use');

    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'files',
    });
  });

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

const getBucket = () => {
  if (!bucket) {
    throw new Error(
      'Bucket has not been initialized. Make sure MongoDB is connected.'
    );
  }
  return bucket;
};

module.exports = { connectDB, getBucket };
