const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/UserRoutes')

router.get('/', (req, res) => {
  res.status(200).json({
    api: "running"
  })
});

router.use('/users',userRoutes);

module.exports = router;