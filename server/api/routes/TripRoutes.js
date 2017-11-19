const express = require('express');
const router = express.Router();

const Logger = require('../../log/Logger')
const SchemaHelper = require('./helpers/schema/SchemaHelper')
const AuthHelper = require('./helpers/auth/AuthHelper');

const tripController = require('../../controllers/trips/TripsController')

router.post('/', (req, res) => {
  const trip = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'create_trips').then(() => {
      tripController.create(user).then(retTrip => {
        Logger.log("Trip created: " + JSON.stringify({
          id: retTrip.id,
        }),Logger.INFO());
        res.status(201).json({
          id: retTrip.id,
        });
      }).catch(fail => {
        Logger.log("Trip could not be created: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map(err => {
            return { error: err.message }
          })
        });
      });
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  });
});




module.exports = router;