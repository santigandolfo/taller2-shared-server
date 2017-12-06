const Joi = require('joi');

const TripEstimationSchemaMap = {
  time_travel_in_min: Joi.number().required(),
  time_pickup_in_min: Joi.number().required(),
  distance_in_km: Joi.number().required(),
  passenger_id: Joi.number().required(),
  driver_id: Joi.number().required(),
  start_location: Joi.array().items(Joi.number()).required(),
  end_location: Joi.array().items(Joi.number()).required(),
  pay_method: Joi.string().alphanum().required(),

};

module.exports = TripEstimationSchemaMap;
