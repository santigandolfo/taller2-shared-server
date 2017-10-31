const express = require('express');
const router = express.Router();

const BusinessUserController = require('../../controllers/business-controller/BusinessUserController')
const RoleController = require('../../controllers/business-controller/RoleController')

const AuthHelper = require('./helpers/auth/AuthHelper');
const Logger = require('../../log/Logger')

const buserController = new BusinessUserController();
const roleController = new RoleController();

router.post('/', (req, res) => {
  let user = req.body;
  user.roleId = null;
  buserController.create(user).then(retUser => {
    Logger.log("Business User created: " + JSON.stringify({
      id: retUser.id,
      username: retUser.username
    }),Logger.INFO());
    res.status(201).json({
      id: retUser.id,
      token: AuthHelper.signToken(user)
    });
  }).catch(fail => {
    Logger.log("Business User could not be created: " + JSON.stringify(fail.errors),Logger.ERROR(''));
    res.status(500).json({
      errors: fail.errors.map(err => {error: err.message})
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
      errors: fail.errors.map(err => {error: err.message})
    });
  });
});

router.get('/me', (req, res) => {
  AuthHelper.verifyToken(req,res).then(authUser => {
      res.status(200).json(authUser);
    }).catch(error => {
      res.status(401).json(error);
    });
});

router.get('/roles',(req,res) => {
  roleController.all().then(roles => {
    Logger.log("Roles retrieved: " + JSON.stringify(roles),Logger.INFO());
    res.status(200).json(roles);
  }).catch(fail => {
    Logger.log("Roles could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors.map(err => {error: err.message})
    });
  });
});

router.get('/roles/:name',(req,res) => {
  roleController.getByName(req.params.name).then(role => {
    Logger.log("Role retrieved: " + JSON.stringify(role),Logger.INFO());
    res.status(200).json(role);
  }).catch(fail => {
    Logger.log("Role could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors.map(err => {error: err.message})
    });
  });
});

router.post('/roles',(req,res) => {
  let role = req.body;
  roleController.create(role).then(retRole => {
    Logger.log("Role created: " + JSON.stringify(role),Logger.INFO());
    res.status(201).json({id: retRole.id});
  }).catch(fail => {
    Logger.log("Role could not be created: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors.map(err => {error: err.message})
    });
  });
});

router.put('/:userId/role/:roleId',(req,res) => {
  let userId = req.params.userId;
  let roleId = req.params.roleId
  roleController.getById(roleId).then(role => {
    if(role){
      buserController.getById(userId).then(user => {
        if(user){
          user.setRole(role);
          res.status(200).send();
        }else{
          Logger.log("Business User with id " + userId + " not found.",Logger.WARNING());
          res.status(404).json({
            error: "Business User with id " + userId + " not found"
          });
        }
      }).catch(fail => {
        Logger.log("Business User with id " + userId + " could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }else{
      Logger.log("Role with id " + roleId + " not found.",Logger.WARNING());
      res.status(404).json({
        error: "Role with id " + roleId + " not found."
      });
    }
  }).catch(fail => {
    Logger.log("Role with id " + roleId + " could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors.map((err) => {return {error: err.message}})
    });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  buserController.getById(id).then(retUser => {
    if(retUser != null){
      Logger.log("Business User retrieved: " + JSON.stringify(retUser),Logger.INFO());
      res.status(200).json(retUser);
    }else{
      Logger.log("Business User with id " + id + " not found.",Logger.WARNING());
      res.status(404).json({
        error: "Business User with id " + id + " not found."
      });
    }
  }).catch(fail => {
    Logger.log("Business User with id " + id + " could not be retrieved: " + fail,Logger.ERROR(''));
    res.status(500).json({
      errors: [
        {error: fail.toString()}
      ]
    });
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let user = req.body;
  buserController.update(user,id).then(retUser => {
      Logger.log("Business User with id " + id + " updated.",Logger.INFO());
      res.status(200).send();
  }).catch(fail => {
    Logger.log("Business User with id " + id + "could not be updated: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors.map((err) => {return {error: err.message}})
    });
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  buserController.delete(id).then(retUser => {
    Logger.log(("Business User with id " + id + " deleted."),Logger.INFO());
    res.status(200).send();
  }).catch(fail => {
    Logger.log("Business User with id " + id + "could not be deleted: " + JSON.stringify(fail.errors),Logger.ERROR());
    res.status(500).json({
      errors: fail.errors.map((err) => {return {error: err.message}})
    });
  });
});

module.exports = router;