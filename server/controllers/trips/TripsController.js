const Trip = require('../../models/trip/Trip');

module.exports = class TripsController {

  constructor(){}

  create(trip){
    const modTrip = Object.assign({}, trip);
    const start_loc = {type: 'Point',coordinates: trip.start_loc}
    const end_loc   = {type: 'Point',coordinates: trip.end_loc}

    modTrip.start_loc = start_loc
    modTrip.end_loc = end_loc
    return Trip.create(modTrip);
  }
}