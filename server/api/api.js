const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/UserRoutes')
const AuthRoutes = require('./routes/AuthRoutes')

router.get('/', (req, res) => {
  res.status(200).json({
    api: "running"
  })
});

router.use('/auth',AuthRoutes);
router.use('/users',userRoutes);

module.exports = router;