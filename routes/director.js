const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

const Director = require('../models/Director');

router.post('/add', (req, res, next)=> {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
      res.json(
        {data, status: 1});
    }).catch((err) => {
        res.json( {status: 0});
    });
});


router.get('/list', (req,res,next) => {
  const promise = Director.aggregate([
    {   
      $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField:'director_id',
          as: 'movies'
        }
      },
      {
          $unwind: {
            path: '$movies'
       //preserveNullAndEmptyArrays: true
          }
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push: '$movies'
          }
        },
        
      },
      {
        $project: {
          _id: '$_id._id',
          name: '$_id.name',
          surname: '$_id.surname',
          movies: '$movies'
        }
      }
    ]);
    promise.then((data)=> {
      res.json(data);
    }).catch((err)=> {
      res.json(err);
    });
});

router.get('/get/:id', (req,res,next) => {
  const promise = Director.aggregate([
    {  
      $match: 
      {
      '_id': mongoose.Types.ObjectId(req.params.id)
      } ,
      $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField:'director_id',
          as: 'movies'
        }
      },
      {
          $unwind: {
            path: '$movies'
       //preserveNullAndEmptyArrays: true
          }
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push: '$movies'
          }
        },
        
      },
      {
        $project: {
          _id: '$_id._id',
          name: '$_id.name',
          surname: '$_id.surname',
          movies: '$movies'
        }
      }
    ]);
    promise.then((data)=> {
      res.json(data);
    }).catch((err)=> {
      res.json(err);
    });
});

router.put('/update/:id', (req,res,next) => {
  const promise = Director.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
    );
  promise.then((director) => {
    if(!director) {
       next({ message: 'yhe' });
    }
    res.json(director);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/delete/:id', (req,res,next) => {
  const promise = Director.findByIdAndRemove(req.params.id);
  promise.then((director) => {
    if(!director) {
       next({ message: 'yhe' });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
  