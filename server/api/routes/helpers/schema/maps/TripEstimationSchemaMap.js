const Joi = require('joi');
const PositionSchema = {

}
const TripEstimationSchemaMap = {
  time_travel_in_min: Joi.number().required(),
  time_pickup_in_min: Joi.number().required(),
  distance_in_km: Joi.number().required(),
  passenger_id: Joi.number().required(),
  driver_id: Joi.number().required(),
  start_location: Joi.array().items(Joi.string()).min(2).max(2).required(),
  end_location: Joi.array().items(Joi.string()).required(),
  pay_method: Joi.string().alphanum().required(),

};

module.exports = TripEstimationSchemaMap;