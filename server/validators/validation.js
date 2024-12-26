const Joi = require('joi');
const JoiPasswordComplexity = require('joi-password-complexity');

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

module.exports = {
  loginValidation,
  passwordValidation,
};
