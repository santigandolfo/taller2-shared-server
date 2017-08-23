const express = require('express');
const router = express.Router();

const UsersCotroller = require('../controllers/users/UsersController')
const controller = new UsersCotroller();

router.get('/', (req, res) => {
  res.status(200).json(controller.all())
});

module.exports = router;