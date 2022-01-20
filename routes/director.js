const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

const Director = require('../models/Director');

router.post('/add', (req, res, next)=> {
    const data  = req.body;
    
    const director = new Movie({
      name : data.name,
      surname : data.surname,
      bio : data.bio,
      
    });
    const promise = director.save();
    promise.then((data) => {
      res.json(
        {data, status: 1});
    }).catch((err) => {
        res.json( {status: 0});
    });
  });

  router.get('/list', (req,res,next) => {
    const promise = Director.find({});
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
  