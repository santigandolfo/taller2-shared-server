const express = require('express');
const router = express.Router();

const UsersController = require('../../controllers/users/UsersController');
const AuthHelper = require('../routes/helpers/auth/AuthHelper');
const Logger = require('../../log/Logger');
const controller = new UsersController();

router.post('/', (req, res) => {
  let user = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'create_users').then(() => {
      controller.create(user).then(retUser => {
        Logger.log("User created: " + JSON.stringify({
          id: retUser.id,
          username: retUser.username
        }),Logger.INFO());
        res.status(201).json({id: retUser.id});
      }).catch(fail => {
        Logger.log("User could not be created: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }).catch(error => res.status(401).json(error));
  }).catch(error => res.status(401).json(error));
});

router.get('/', (req, res) => {
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'view_users').then(() => {
      controller.all().then(retUsers => {
        Logger.log("Users retrieved: " + JSON.stringify(retUsers),Logger.INFO());
        res.status(200).json(retUsers);
      }).catch(fail => {
        Logger.log("Users could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }).catch(error => res.status(401).json(error));
  }).catch(error => res.status(401).json(error));
});

router.post('/validate',(req, res) => {
  let creds = req.body;
  controller.getByCreds(creds).then(retUser => {
    if(retUser !== null){
      Logger.log("User found with: " + JSON.stringify(creds),Logger.INFO());
      delete retUser['password'];
      res.status(200).json(retUser);
    }else{
      Logger.log("User not authorized: " + JSON.stringify(creds),Logger.INFO());
      res.status(401).send();
    }
  }).catch(fail => {
    Logger.log("User could not be found: " + JSON.stringify(fail.errors),Logger.ERROR(''));
    res.status(500).json({
      errors: fail.errors.map((err) => {return {error: err.message}})
    });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'view_users').then(() => { 
      controller.getById(id).then(retUser => {
        if(retUser != null){
          Logger.log("User retrieved: " + JSON.stringify(retUser),Logger.INFO());
          res.status(200).json(retUser);
        }else{
          Logger.log("User with id " + id + " not found.",Logger.WARNING());
          res.status(404).json({
            error: "User with id " + id + " not found."
          });
        }
      }).catch(fail => {
        Logger.log("User with id " + id + " could not be retrieved: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }).catch(error => res.status(401).json(error));
  }).catch(error => res.status(401).json(error));
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let user = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'edit_users').then(() => { 
      controller.update(user,id).then(retUser => {
        Logger.log("User updated: " + JSON.stringify({
          id: retUser.id,
          username: retUser.username
        }),Logger.INFO());
        res.status(200).send();
      }).catch(fail => {
        Logger.log("User with id " + id + " could not be updated: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }).catch(error => res.status(401).json(error));
  }).catch(error => res.status(401).json(error));
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'delete_users').then(() => { 
      controller.delete(id).then(retUser => {
        Logger.log("User deleted: " + JSON.stringify({
          id: id,
        }),Logger.INFO());
        res.status(200).send();
      }).catch(fail => {
        Logger.log("User with id " + id + " could not be deleted: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }).catch(error => res.status(401).json(error));
  }).catch(error => res.status(401).json(error));      
});

router.post('/users/:id/cars', (req, res) => {
  const id = req.params.id;
  const car = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'create_users').then(() => { 
      controller.getById(id).then(retUser => {
        if(retUser != null){
          Logger.log("User retrieved: " + JSON.stringify(retUser),Logger.INFO());
          retUser.addCar(car)
          Logger.log("Car assigned: " + JSON.stringify(car),Logger.INFO());
          res.status(200).json(retUser);
        }else{
          Logger.log("User with id " + id + " not found.",Logger.WARNING());
          res.status(404).json({
            error: "User with id " + id + " not found."
          });
        }
      }).catch(fail => {
        Logger.log("User with id " + id + " could not be assign to car: " + JSON.stringify(fail.errors),Logger.ERROR(''));
        res.status(500).json({
          errors: fail.errors.map((err) => {return {error: err.message}})
        });
      });
    }).catch(error => res.status(401).json(error));
  }).catch(error => res.status(401).json(error));    
});

module.exports = router;