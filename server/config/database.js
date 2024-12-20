const mongoose = require('mongoose');
require('dotenv-safe').config();

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

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

module.exports = { connectDB };
