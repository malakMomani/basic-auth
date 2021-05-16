'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');

const router = express.Router();

router.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send("Error Creating User"); }
});


router.post('/signin', basicAuth, async (req, res) => {

  try {
    let user = Users.findOne({username : req.body.username});
    // console.log(req.body.username);
    // console.log(user._conditions.username);
    res.status(200).json({
      user : user._conditions.username 
    });
  } catch(error) {
    res.status(403).send('Error signing in');
  }

      
});

module.exports = router;