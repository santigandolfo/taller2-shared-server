const express = require('express');
const router = express.Router();

const businessRoutes = require('./routes/BusinessUserRoutes');
const userRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

const apiVersion = "1.0.0";

router.get('/*',(req,res,next) => {
  res.header('version',apiVersion);
  next();
});

router.get('/', (req, res) => {
  res.status(200).json({
    version: apiVersion
  })
});

router.use('/auth',AuthRoutes);
router.use('/users',userRoutes);
router.use('/business-users',businessRoutes);

module.exports = router;