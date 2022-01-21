const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

const Movie = require('../models/Movie');

router.post('/add', (req, res, next)=> {
  const data  = req.body;
  
  const movie = new Movie({
    title : data.title,
    imdb_score : data.imdb_score,
    category : data.category,
    country : data.country,
    year : data.year,
    director_id : data.director_id
  });
  const promise = movie.save();
  promise.then((data) => {
    res.json(
      {data, status: 1});
  }).catch((err) => {
      res.json( {status: 0});
  });
});

router.get('/list', (req,res,next) => {
  const promise = Movie.aggregate([
		{
			$lookup: {
				from: 'directors',
				localField: 'director_id',
				foreignField: '_id',
				as: 'director'
			}
		},
		{
			$unwind: '$director'
		}
	]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/list/top-10', (req,res,next) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1}).collation({  locale: "en_US",numericOrdering: true});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/get/:id', (req,res,next) => {
  const promise = Movie.findById(req.params.id);
  promise.then((movie) => {
    if(!movie) {
       next({ message: 'yhe' });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/update/:id', (req,res,next) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
    );
  promise.then((movie) => {
    if(!movie) {
       next({ message: 'yhe' });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/delete/:id', (req,res,next) => {
  const promise = Movie.findByIdAndRemove(req.params.id);
  promise.then((movie) => {
    if(!movie) {
       next({ message: 'yhe' });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/get/between/:start_year/:end_year', (req,res,next) => {
  const {start_year , end_year} = req.params;
  const promise = Movie.find(
    {
      year: {"$gte":parseInt(start_year) , "$lte":parseInt(end_year)}
    }
  );
  promise.then((movie) => {
    if(!movie) {
       next({ message: 'yhe' });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
