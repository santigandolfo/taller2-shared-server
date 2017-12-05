const Trip = require('../../models/trip/Trip');
const RuleEngine = require('node-rules');
const _Sequelize = require('sequelize');
const moment = require('moment');
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

  populateTrip(trip){
    // Data which is possible to be asked for when the estimation is happening
    // - Trips in month, day, hour, half an hour, 10 mins and antiquity of driver
    // - Trips in month, day, hour, half an hour, 10 mins, balance and antiquity of passenger
    // - Distance, time of travel, start/end geoposition and start date/time 
    // - Payment method
    // - Application server in charge of trip
    // - Waiting time to be picked up
    var driver = User.findOne({where: { id: trip.driver_id}});
    trip.driver = {};
    trip.driver.tripsInMonth = 0;
    trip.driver.tripsInDay = 0;
    trip.driver.tripsInLastHour = 0;
    trip.driver.tripsInLast30Mins = 0;
    trip.driver.tripsInLast10Mins = 0;
    trip.driver.antiquity = 0;
    trip.driver.email = '';
    var passenger = User.findOne({where: { id: trip.passenger_id}});
    trip.passenger = {};
    trip.passenger.tripsInMonth = 0;
    trip.passenger.tripsInDay = 0;
    trip.passenger.tripsInLast30Mins = 0;
    trip.passenger.tripsInLast10Mins = 0;
    trip.passenger.antiquity = 0;
    trip.passenger.balance = 0;
    trip.passenger.email = '';
    trip.appServer = '';
    trip.momentOfStart = moment();

  }

  estimate(trip){

    var rules = getRules();

    var R = new RuleEngine([], {"ignoreFactChanges": true});

    R.fromJSON(rules);
    return R.execute(trip,function(result){ 
      resolve(result.transactionTotal)
      
    });
  }
  
}