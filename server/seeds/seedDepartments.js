const departmentsData = require('./data/departments.json');
const Department = require('../models/department.model.js');

const seedDepartments = async () => {
  try {
    // Clear existing data
    await Department.deleteMany({});

    // Insert new data
    await Department.insertMany(departmentsData);
    console.log('Departments seeded successfully');
  } catch (err) {
    console.error('Error seeding departments:', err);
  }
};

module.exports = seedDepartments;
