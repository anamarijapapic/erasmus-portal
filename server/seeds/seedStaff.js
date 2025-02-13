const { faker } = require('@faker-js/faker');
const User = require('../models/user.model.js');
const genders = require('../enums/genders.js');
const roles = require('../enums/roles.js');

const seedStaff = async () => {
  const staff = [
    {
      _id: '67841d19f5aeb9ddf6aa71b1',
      firstName: 'First',
      lastName: 'Staff',
      email: 'staff1@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '67842f7f320c478f3ed8da4d',
    },
    {
      _id: '67841d19f5aeb9ddf6aa71b2',
      firstName: 'Second',
      lastName: 'Staff',
      email: 'staff2@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '67842f8e320c478f3ed8da5a',
    },
    {
      _id: '67841d19f5aeb9ddf6aa71b3',
      firstName: 'Third',
      lastName: 'Staff',
      email: 'staff3@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '67842fc1320c478f3ed8da67',
    },
    {
      _id: '67841d1af5aeb9ddf6aa71b4',
      firstName: 'Fourth',
      lastName: 'Staff',
      email: 'staff4@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '678430b0320c478f3ed8dab0',
    },
    {
      _id: '67841d1af5aeb9ddf6aa71b5',
      firstName: 'Fifth',
      lastName: 'Staff',
      email: 'staff5@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '678430c4320c478f3ed8dabd',
    },
    {
      _id: '67841d1af5aeb9ddf6aa71b6',
      firstName: 'Sixth',
      lastName: 'Staff',
      email: 'staff6@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '678438f6d1d382e83012bab4',
    },
    {
      _id: '67841d1af5aeb9ddf6aa71b7',
      firstName: 'Seventh',
      lastName: 'Staff',
      email: 'staff7@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '6784392bd1d382e83012bac1',
    },
    {
      _id: '67841d1af5aeb9ddf6aa71b8',
      firstName: 'Eighth',
      lastName: 'Staff',
      email: 'staff8@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '67843a25d1d382e83012bace',
    },
    {
      _id: '67841d1af5aeb9ddf6aa71b9',
      firstName: 'Ninth',
      lastName: 'Staff',
      email: 'staff9@example.com',
      password: 'Staff123!',
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
      role: 'staff',
      studyProgrammeId: '67843a3ad1d382e83012badb',
    },
  ];

  try {
    // Save each user individually to trigger pre-save middleware
    for (const userData of staff) {
      const user = new User(userData);
      await user.save();
    }

    console.log('Staff users seeded successfully');
  } catch (err) {
    console.error('Error seeding staff users:', err);
  }
};

module.exports = seedStaff;
