const express = require('express');
const router = express.Router();

const BusinessUserController = require('../../controllers/business-controller/BusinessUserController')
const RoleController = require('../../controllers/business-controller/RoleController')
const Logger = require('../../log/Logger')

const buserController = new BusinessUserController();
const roleController = new RoleController();

router.post('/', (req, res) => {
  let user = req.body;
  buserController.create(user).then(retUser => {
    Logger.log("Business User created: " + JSON.stringify({
      id: retUser.id,
      username: retUser.username
    }),Logger.INFO());
    res.status(201).send();
  }).catch(fail => {
    Logger.log("Business User could not be created: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.get('/', (req, res) => {
  buserController.all().then(retUsers => {
    Logger.log("Business Users retrieved: " + JSON.stringify(retUsers),Logger.INFO());
    res.status(200).json(retUsers);
  }).catch(fail => {
    Logger.log("Business Users could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.get('/roles',(req,res) => {
  roleController.all().then(roles => {
    Logger.log("Roles retrieved: " + JSON.stringify(roles),Logger.INFO());
    res.status(200).json(roles);
  }).catch(fail => {
    Logger.log("Roles could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.post('/role',(req,res) => {
  let role = req.body;
  roleController.create(role).then(() => {
    Logger.log("Role created: " + JSON.stringify(role),Logger.INFO());
    res.status(201).send();
  }).catch(fail => {
    Logger.log("Role could not be created: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.put('/:userId/role/:roleId',(req,res) => {
  let userId = req.params.userId;
  let roleId = req.params.userId
  roleController.getById(roleId).then(role => {
    buserController.getById(userId).then(user => {
      user.setRole(role);
      res.status(203).send();
    }).catch(fail => {
      Logger.log("Business User with id " + userId + "could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
      res.status(500).json({
        errors: fail.errors
      });
    });
  }).catch(fail => {
    Logger.log("Role with id " + roleId + " could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  buserController.getById(id).then(retUser => {
    Logger.log("Business User retrieved: " + JSON.stringify(retUser),Logger.INFO());
    res.status(200).json(retUser);
  }).catch(fail => {
    Logger.log("Business User with id " + id + "could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let user = req.body;
  buserController.update(user,id).then(retUser => {
    Logger.log("Business User updated: " + JSON.stringify({
      id: retUser.id,
      username: retUser.username
    }),Logger.INFO());
    res.status(200).send();
  }).catch(fail => {
    Logger.log("Business User with id " + id + "could not be updated: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  buserController.delete(id).then(retUser => {
    Logger.log("Business User deleted: " + JSON.stringify({
      id: id,
    }),Logger.INFO());
    res.status(200).send();
  }).catch(fail => {
    Logger.log("Business User with id " + id + "could not be deleted: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors
    });
  });
});

module.exports = router;