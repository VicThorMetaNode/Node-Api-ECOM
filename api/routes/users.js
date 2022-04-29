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

//import Token Creator package
const jwt = require('jsonwebtoken');




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


//------------- LOGIN USERS -----------------
router.post("/login", (req, res, next) => {
 User.find({ email: req.body.email})
 .exec()
 .then( user => {
   if (user.length < 1) { //if we have no match w/ an existing user then return 401 =  lacks valid authentication credentials
     return res.status(401).json({
         message: ' Authentication failed ! '
     });
   }
   bcrypt.compare(req.body.password, user[0].password, (err, result) => { //if password don't match the one the user used to sign up, then return 401 = lacks valid authentication credentials
     if (err) {
       return res.status(401).json({
        message: ' Authentication failed ! '
      });
     }
     if (result) {
       const token = jwt.sign({ //generate a token if access granted
         email: user[0].email,
         userId: user[0]._id
       }, process.env.JWT_KEY, {//private key sits in env.var file
           expiresIn: "1h"    // options sit here
       } 
      ); 
      return res.status(200).json({
       message: ' Access Granted ! ',
       token: token
     });
    }
    res.status(401).json({
      message: ' Authentication failed ! '
    });
   });
 })
.catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
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