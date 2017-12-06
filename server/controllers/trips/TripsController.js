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

    trip.driver.antiquity = moment().diff(moment(driver.createdAt, format));
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
  
  estimate(trip) {


    //define the rules
    var rulesRider = [
    {
        "condition": function(R) {
            
            R.when(this && (this.balance < 0));
        },
        "consequence": function(R) {
            
            
            this.canTravel = false;
            R.stop();
        }
    },
    {
        "condition": function(R) {
            
            
            R.when(this && this.passenger.email.length > 12
            && this.passenger.email.slice(-12) == '@llevame.com');
        },
        "consequence": function(R) {
            
            
            this.transactionTotal = 0;
            R.stop();
        }
    },
    {
        "condition": function(R) {
            
            R.when(true);
        },
        "consequence": function(R) {
            
            
            this.transactionTotal = this.distance_in_km * 15;
            R.next();
        }
    },{
        "condition": function(R) {
            
            R.when(this && this.momentOfStart
            && this.momentOfStart.day() == 3
            && this.momentOfStart.format('HHmmss') >= '160000'
            && this.momentOfStart.format('HHmmss') <= '170000');
        },
        "consequence": function(R) {
            
            this.transactionTotal = this.transactionTotal * 0.95;
            R.next();
        }
    },{
        "condition": function(R) {
            
            R.when(this && (this.trips == 0));
        },
        "consequence": function(R) {
            
            
            this.transactionTotal -= 100;
            R.next();
        }
    },{
        "condition": function(R) {
            
            R.when(this && this.momentOfStart.day() == 1
            && this.momentOfStart.format('HHmmss') >= '170000'
            && this.momentOfStart.format('HHmmss') <= '190000');
      },
        "consequence": function(R) {
            
            
            this.transactionTotal = this.transactionTotal * 1.10;
            R.next();
        }
    },{
        "condition": function(R) {
            
            R.when(this && (this.passenger.tripsInLast30Minutes > 10));
        },
        "consequence": function(R) {
            
            
            this.transactionTotal = this.transactionTotal *1.15;
            R.next();
        }
    },{
        "condition": function(R) {
            
            R.when(this && (this.transactionTotal < 50));
        },
        "consequence": function(R) {
            
            this.transactionTotal = 50;
            R.stop();
        }
    }];
    
    var R = new RuleEngine(rulesRider, {"ignoreFactChanges": true});

    return R.execute(trip, function(result){
      resolve(result.transactionTotal);
    })
    // var rules = getRules();
    
    //     var R = new RuleEngine([], {"ignoreFactChanges": true});
    
    //     R.fromJSON(rules);
    //     return R.execute(trip,function(result){ 
    //       resolve(result.transactionTotal)
          
    //     });
  }
}