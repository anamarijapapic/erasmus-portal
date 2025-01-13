const mongoose = require('mongoose');
const institutionsData = require('./data/institutions.json');
const Institution = require('../models/institution.model.js');

const seedInstitutions = async () => {
  try {
    // Clear existing data
    await Institution.deleteMany({});

    // Insert new data
    await Institution.insertMany(institutionsData);
    console.log('Institutions seeded successfully');
  } catch (err) {
    console.error('Error seeding institutions:', err);
  }
};

module.exports = seedInstitutions;
