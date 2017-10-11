const express = require('express');
const router = express.Router();

const businessRoutes = require('./routes/BusinessUserRoutes');
const userRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

router.get('/', (req, res) => {
  res.status(200).json({
    version: "1.0.0"
  })
});

router.use('/auth',AuthRoutes);
router.use('/users',userRoutes);
router.use('/business-users',businessRoutes);

module.exports = router;