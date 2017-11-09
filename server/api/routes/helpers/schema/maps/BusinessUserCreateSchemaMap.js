const Joi = require('joi');
const BusinessUserCreateSchemaMap = {
  username: Joi.string().alphanum().required(),
  name: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
};

module.exports = BusinessUserCreateSchemaMap;