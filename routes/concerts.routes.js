const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  let item = db.concerts[Math.floor(Math.random() * db.concerts.length)];
  res.json(item);
});


router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  db.concerts.push(newConcert);
  return res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const index = db.concerts.findIndex(item => item.id == req.params.id);
  const editedConcert = {
    ...db.concerts[index],
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  db.concerts[index] = editedConcert;
  return res.json({message: 'ok'});
});


router.route('/concerts/:id').delete((req, res) => {
  const indexToDelete = db.concerts.findIndex(item => item.id == req.params.id);
  db.concerts.splice(indexToDelete, 1);
  return res.json({message: 'OK'});
});

module.exports = router;