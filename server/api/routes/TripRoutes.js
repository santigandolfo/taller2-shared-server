const express = require('express');
const router = express.Router();

const Logger = require('../../log/Logger')
const SchemaHelper = require('./helpers/schema/SchemaHelper')
const AuthHelper = require('./helpers/auth/AuthHelper');

const TripController = require('../../controllers/trips/TripsController')
const RulesController = require('../../controllers/rules/RulesController')
const BusinessUserCreateSchemaMap = require('./helpers/schema/maps/BusinessUserCreateSchemaMap')
const TripEstimationSchemaMap = require('./helpers/schema/maps/TripEstimationSchemaMap')

const tripController = new TripController();
const rulesController = new RulesController();

router.post('/', (req, res) => {
  const trip = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'create_trips').then(() => {
      tripController.create(trip).then(retTrip => {
        Logger.log("Trip created: " + JSON.stringify({
          id: retTrip.id,
        }),Logger.INFO());
        res.status(201).json({
          id: retTrip.id,
        });
      }).catch(fail => {
        Logger.log("Trip could not be created: " + fail.toString(),Logger.ERROR(''));
        res.status(500).json({
          errors: [{
            error: fail.toString()
          }]
        });
      });
    }).catch(error => {
      Logger.log("User unauthorized: " + error.toString(),Logger.WARNING());
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  });
});

router.post('/estimate', (req, res) => {
  const trip = req.body;
  SchemaHelper.check(trip,TripEstimationSchemaMap).then(() => {
    AuthHelper.verifyToken(req, res).then(authUser => {
      tripController.populateTrip(trip);
      rulesController.getRulesByUserName(authUser.username).then(rules => {
        tripController.estimate(trip,rules).then(result => {
          console.log(result)
          res.status(200).json({
            currency: "$",
            value: result
          });
        })
      })
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });    
  }).catch(error => {
    Logger.log("Trip bad formed: " + error.toString(),Logger.WARNING());
    res.status(400).json(error)
  });

});


module.exports = router;