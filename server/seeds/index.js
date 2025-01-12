const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const seedSubjectAreas = require('./seedSubjectAreas');
const seedUsers = require('./seedUsers');
const seedInstitutions = require('./seedInstitutions');
const seedDepartments = require('./seedDepartments');
const seedStudyProgrammes = require('./seedStudyProgrammes');
const seedStudents = require('./seedStudents');
const seedStaff = require('./seedStaff');

const runSeeds = async () => {
  // Connect to the database
  connectDB();

  await seedSubjectAreas();
  await seedUsers();
  await seedInstitutions();
  await seedDepartments();
  await seedStudyProgrammes();
  await seedStudents();
  await seedStaff();

  // Disconnect from the database
  mongoose.disconnect();
};

runSeeds().catch((error) => console.error('Error seeding database:', error));
