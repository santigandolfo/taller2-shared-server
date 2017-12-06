const Trip = require('../../models/trip/Trip');
const User = require('../../models/user/User');
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

  getRules(trip){
    
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

    trip.driver.tripsInMonth = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(30, 'day')
        },
        driver_id: trip.driver_id
      }
    });
    trip.driver.tripsInDay = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(1, 'day')
        },
        driver_id: trip.driver_id
      }
    });
    trip.driver.tripsInLastHour = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(1, 'hour')
        },
        driver_id: trip.driver_id
      }
    });
    trip.driver.tripsInLast30Mins = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(30, 'minute')
        },
        driver_id: trip.driver_id
      }
    });
    trip.driver.tripsInLast10Mins = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(10, 'minute')
        },
        driver_id: trip.driver_id
      }
    });

    trip.driver.antiquity = moment().diff(moment(driver.createdAt, 'HHmmss'));
    trip.driver.email = driver.email;
    var passenger = User.findOne({where: { id: trip.passenger_id}});
    trip.passenger = {};
    
    trip.passenger.tripsInMonth = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(30, 'day')
        },
        passenger_id: trip.passenger_id
      }
    });
    trip.passenger.tripsInDay = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(1, 'day')
        },
        passenger_id: trip.passenger_id
      }
    });
    trip.passenger.tripsInLastHour = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(1, 'hour')
        },
        passenger_id: trip.passenger_id
      }
    });
    trip.passenger.tripsInLast30Mins = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(30, 'minute')
        },
        passenger_id: trip.passenger_id
      }
    });
    trip.passenger.tripsInLast10Mins = Trip.count({ 
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(10, 'minute')
        },
        passenger_id: trip.passenger_id
      }
    });
    trip.passenger.balance = 0;
    trip.appServer = 'FiUber';
    trip.momentOfStart = moment();

  }
  
  estimate(trip,rules) {    
    var R = new RuleEngine(rules, {"ignoreFactChanges": true});
    return new Promise((resolve,reject) => {
      R.execute(trip,function(result){ 
        console.log("result -> " + JSON.stringify(result))
        resolve(result.transactionTotal)
      });
    })
  }
}