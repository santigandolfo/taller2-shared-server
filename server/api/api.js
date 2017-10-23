const express = require('express');
const router = express.Router();

const businessRoutes = require('./routes/BusinessUserRoutes');
const userRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

const apiVersion = process.env.API_VERSION;
const apiAuthor = process.env.API_AUTHOR;
const apiReleaseDate = process.env.API_RELEASE_DATE;

router.use((req,res,next) => {
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

router.use('/auth',AuthRoutes);
router.use('/users',userRoutes);
router.use('/business-users',businessRoutes);

module.exports = router;