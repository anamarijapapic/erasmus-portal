const subjectAreasData = require('./data/subjectareas.json');
const SubjectArea = require('../models/subjectArea.model.js');

const seedSubjectAreas = async () => {
  try {
    // Clear existing data
    await SubjectArea.deleteMany({});

    // Insert new data
    await SubjectArea.insertMany(subjectAreasData);
    console.log('Subject Areas seeded successfully');
  } catch (err) {
    console.error('Error seeding subject areas:', err);
  }
};

module.exports = seedSubjectAreas;
