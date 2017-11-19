const express = require('express');
const router = express.Router();

const BusinessRoutes = require('./routes/BusinessUserRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const TripRoutes = require('./routes/TripRoutes')
const Logger = require('../log/Logger');

const apiVersion = process.env.API_VERSION;
const apiAuthor = process.env.API_AUTHOR;
const apiReleaseDate = process.env.API_RELEASE_DATE;

router.use((req,res,next) => {
  Logger.log("Request Headers:" + JSON.stringify(req.headers),Logger.INFO());
  res.header('api-version',apiVersion);
  next();
});

router.get('/', (req, res) => {
  res.status(200).json({
    version: apiVersion,
    author: apiAuthor,
    release_date: apiReleaseDate
  })
});

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/business-users', BusinessRoutes);
router.use('/trips', TripRoutes);


module.exports = router;