const express = require('express');
const router = express.Router();

const UsersCotroller = require('../../controllers/users/UsersController');
const Logger = require('../../log/Logger');
const controller = new UsersCotroller();

router.post('/', (req, res) => {
  let user = req.body;
  controller.create(user).then(retUser => {
    Logger.log("User created: " + JSON.stringify({
      id: retUser.id,
      username: retUser.username
    }),Logger.INFO());
    res.status(201).send();
  }).catch(fail => {
    Logger.log("User could not be created: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.get('/', (req, res) => {
  controller.all().then(retUsers => {
    Logger.log("Users retrieved: " + JSON.stringify(retUsers),Logger.INFO());
    res.status(200).json(retUsers);
  }).catch(fail => {
    Logger.log("Users could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  controller.getById(id).then(retUser => {
    Logger.log("User retrieved: " + JSON.stringify(retUser),Logger.INFO());
    res.status(200).json(retUser);
  }).catch(fail => {
    Logger.log("User with id " + id + "could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let user = req.body;
  controller.update(user,id).then(retUser => {
    Logger.log("User updated: " + JSON.stringify({
      id: retUser.id,
      username: retUser.username
    }),Logger.INFO());
    res.status(200).send();
  }).catch(fail => {
    Logger.log("User with id " + id + "could not be updated: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  controller.delete(id).then(retUser => {
    Logger.log("User deleted: " + JSON.stringify({
      id: id,
    }),Logger.INFO());
    res.status(200).send();
  }).catch(fail => {
    Logger.log("User with id " + id + "could not be deleted: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

module.exports = router;