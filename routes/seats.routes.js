const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  let item = db.seats[Math.floor(Math.random() * db.seats.length)];
  res.json(item);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const newData = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  if (db.seats.some(item => (item.day == req.body.day && item.seat === req.body.seat))) {
    res.status(400).json({message:`The slot is already taken...`});
  }
  else {
    db.seats.push(newData);
    return res.json({ message: 'Add resevation' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const index = db.seats.findIndex(item => item.id == req.params.id);
  const editedSeat = {
    ...db.seats[index],
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  db.seats[index] = editedSeat;
  return res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  const indexToDelete = db.seats.findIndex(item => item.id == req.params.id);
  db.seats.splice(indexToDelete, 1);
  return res.json({message: 'Done'});
});

module.exports = router;