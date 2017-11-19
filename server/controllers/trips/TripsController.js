const Trip = require('../../models/trip/Trip');

module.exports = class TripsController {

  constructor(){}

  create(trip){
    return Trip.create(trip);
  }
}