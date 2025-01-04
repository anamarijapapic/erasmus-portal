const Joi = require('joi');
const JoiPasswordComplexity = require('joi-password-complexity');
const genders = require('../enums/genders.js');
const roles = require('../enums/roles.js');

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const complexityOptions = {
  min: 5,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const passwordValidation = (data) => {
  const passwordSchema = Joi.object({
    password: JoiPasswordComplexity(complexityOptions),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  });
  return passwordSchema.validate(data);
};

const userValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: JoiPasswordComplexity(complexityOptions),
    gender: Joi.string()
      .valid(genders.Male, genders.Female)
      .default(genders.Male),
    dateOfBirth: Joi.date().required(),
    placeOfBirth: Joi.string().required(),
    citizenship: Joi.string().required(),
    pinOIB: Joi.string().min(11).required(),
    idCardNumber: Joi.string().min(9).required(),
    address: Joi.string().required(),
    contactNumber: Joi.string().min(6),
    semester: Joi.number().required(),
    yearOfStudy: Joi.number().required(),
    role: Joi.string()
      .valid(roles.Admin, roles.Student, roles.Staff, roles.Coordinator)
      .default(roles.Student),
    // studyProgramme: Joi.objectId().required(),
  });

  return schema.validate(data);
};

module.exports = {
  loginValidation,
  passwordValidation,
  userValidation,
};
