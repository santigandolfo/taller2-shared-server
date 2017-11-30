const Trip = require('../../models/trip/Trip');
const RuleEngine = require('node-rules');
const _Sequelize = require('sequelize')
const Op = _Sequelize.Op;

module.exports = class TripsController {

  constructor(){
    const rules = [{
      "condition": function(R) {
          R.when(this && (this.distance > 500));
      },
      "consequence": function(R) {
          this.value = 0.9 * this.cost.value
          R.stop();
      }
    }];
  
    this.R = new RuleEngine(rules);
  }

  create(trip){
    const modTrip = Object.assign({}, trip);
    const start_location = {type: 'Point',coordinates: trip.start_location};
    const end_location   = {type: 'Point',coordinates: trip.end_location};

    modTrip.start_location = start_location;
    modTrip.end_location = end_location;
    return Trip.create(modTrip);
  }

  getByUserId(anId){
    return new Promise((resolve,reject) => {
      Trip.findAll({
        where: {
          [Op.or]: [
            {driver_id: anId}, 
            {passenger_id: anId}
          ]
        },
      }).then(retTrips => {
        resolve(retTrips.map(trip => {
          trip.start_location = trip.start_location.coordinates;
          trip.end_location = trip.end_location.coordinates;
          return trip;
        }))
      }).catch(err => {
        reject(err)
      })
    })
  }

  estimate(trip){
    return new Promise((resolve,reject) => {
      const cost = {
        currency: "$",
        value: 18.1 * trip.distance
      }
      resolve(cost)
      // R.execute(cost,function(result){ 
      //   resolve(result.cost)
      // });
    })
  }
  
}