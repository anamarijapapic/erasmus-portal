const { faker } = require('@faker-js/faker');
const User = require('../models/user.model.js');
const genders = require('../enums/genders.js');

const seedUsers = async () => {
  const users = [
    {
      _id: '67841d19f5aeb9ddf6aa71e7',
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      gender: faker.helpers.arrayElement(genders),
      dateOfBirth: faker.date.birthdate(),
      placeOfBirth: faker.location.city(),
      citizenship: faker.location.country(),
      pinOIB: faker.string.numeric(11),
      idCardNumber: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      contactNumber: faker.phone.number(),
      semester: 0,
      yearOfStudy: 0,
      role: 'admin',
      studyProgrammeId: null,
    },
    {
      _id: '67841d19f5aeb9ddf6aa71ec',
      firstName: 'First',
      lastName: 'Coordinator',
      email: 'coordinator1@example.com',
      password: 'Coordinator123!',
      gender: faker.helpers.arrayElement(genders),
      dateOfBirth: faker.date.birthdate(),
      placeOfBirth: faker.location.city(),
      citizenship: faker.location.country(),
      pinOIB: faker.string.numeric(11),
      idCardNumber: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      contactNumber: faker.phone.number(),
      semester: 0,
      yearOfStudy: 0,
      role: 'coordinator',
      studyProgrammeId: null,
    },
    {
      _id: '67841d19f5aeb9ddf6aa71ef',
      firstName: 'Second',
      lastName: 'Coordinator',
      email: 'coordinator2@example.com',
      password: 'Coordinator123!',
      gender: faker.helpers.arrayElement(genders),
      dateOfBirth: faker.date.birthdate(),
      placeOfBirth: faker.location.city(),
      citizenship: faker.location.country(),
      pinOIB: faker.string.numeric(11),
      idCardNumber: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      contactNumber: faker.phone.number(),
      semester: 0,
      yearOfStudy: 0,
      role: 'coordinator',
      studyProgrammeId: null,
    },
    {
      _id: '67841d1af5aeb9ddf6aa71f2',
      firstName: 'Third',
      lastName: 'Coordinator',
      email: 'coordinator3@example.com',
      password: 'Coordinator123!',
      gender: faker.helpers.arrayElement(genders),
      dateOfBirth: faker.date.birthdate(),
      placeOfBirth: faker.location.city(),
      citizenship: faker.location.country(),
      pinOIB: faker.string.numeric(11),
      idCardNumber: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      contactNumber: faker.phone.number(),
      semester: 0,
      yearOfStudy: 0,
      role: 'coordinator',
      studyProgrammeId: null,
    },
    {
      _id: '67841d1af5aeb9ddf6aa71f4',
      firstName: 'Fourth',
      lastName: 'Coordinator',
      email: 'coordinator4@example.com',
      password: 'Coordinator123!',
      gender: faker.helpers.arrayElement(genders),
      dateOfBirth: faker.date.birthdate(),
      placeOfBirth: faker.location.city(),
      citizenship: faker.location.country(),
      pinOIB: faker.string.numeric(11),
      idCardNumber: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      contactNumber: faker.phone.number(),
      semester: 0,
      yearOfStudy: 0,
      role: 'coordinator',
      studyProgrammeId: null,
    },
    {
      _id: '67841d1af5aeb9ddf6aa71f6',
      firstName: 'Fifth',
      lastName: 'Coordinator',
      email: 'coordinator5@example.com',
      password: 'Coordinator123!',
      gender: faker.helpers.arrayElement(genders),
      dateOfBirth: faker.date.birthdate(),
      placeOfBirth: faker.location.city(),
      citizenship: faker.location.country(),
      pinOIB: faker.string.numeric(11),
      idCardNumber: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      contactNumber: faker.phone.number(),
      semester: 0,
      yearOfStudy: 0,
      role: 'coordinator',
      studyProgrammeId: null,
    },
  ];

  try {
    // Clear existing data
    await User.deleteMany({});

    // Save each user individually to trigger pre-save middleware
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }

    console.log('Users seeded successfully');
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};

module.exports = seedUsers;
