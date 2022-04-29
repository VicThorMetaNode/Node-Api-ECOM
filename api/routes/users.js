// import express using 'require' cause 'import' is not supported by Node
const express = require('express');

//setup express router using a package as a function
const router = express.Router();

//import Mongoose
const mongoose = require('mongoose');
const user = require('../models/user');

//import Models for user
const User = require('../models/user');

//import encrypt package
const bcrypt = require('bcrypt');




//------------- ADD USERS -----------------


router.post('/signup', (req, res, next) => {
//let's first ensure user mail does not already exist in db  
  User.find({ email: req.body.email})
  .exec()
  .then( user => {
    if (user.length >= 1) {
      return res.status(409).json({ // 409err = conflict with the current state
        message: 'Mail adress already exists !'
      });
    } else { //if ok, then encrypt pwd
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
          const user = new User ({ //then create new user
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
          });
          user
          .save()
          .then(result => {
              console.log(result);
              res.status(201).json({ //set status code to 201 !
                message: "User Signed Up !"});
              })
          .catch(
              err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
        }
    })
    }
  });
});


//------------- DELETE USERS -----------------

router.delete('/:userId', (req, res, next) => {
    User.deleteMany({_id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted !'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});















module.exports = router;