const studyProgrammesData = require('./data/studyprogrammes.json');
const StudyProgramme = require('../models/studyProgramme.model.js');

const seedStudyProgrammes = async () => {
  try {
    // Clear existing data
    await StudyProgramme.deleteMany({});

    // Insert new data
    await StudyProgramme.insertMany(studyProgrammesData);
    console.log('Study Programmes seeded successfully');
  } catch (err) {
    console.error('Error seeding study programmes:', err);
  }
};

module.exports = seedStudyProgrammes;
