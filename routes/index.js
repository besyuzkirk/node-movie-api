const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const {username , password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });
  
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err)=> {
      res.json(err);
    })
  });

  
  
});

router.post('/authanticate', (req, res) => {
  const {username , password} = req.body;

  User.findOne({
    username
  } , (err , user) => {
    if(err)
      throw err;
    if(!user) {
      res.json({
        status: false,
        message: 'faild'
      });
    }
  });
});

module.exports = router;
