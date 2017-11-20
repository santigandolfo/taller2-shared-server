const Trip = require('../../models/trip/Trip');

module.exports = class TripsController {

  constructor(){}

  create(trip){
    const modTrip = Object.assign({}, trip);
    const start_location = {type: 'Point',coordinates: trip.start_location};
    const end_location   = {type: 'Point',coordinates: trip.end_location};

    modTrip.start_location = start_location;
    modTrip.end_location = end_location;
    return Trip.create(modTrip);
  }
}