const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  let item = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(item);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.testimonials.push(newTestimonial);
  return res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const index = db.testimonials.findIndex(item => item.id == req.params.id)
  const editedTestimonial = {
    ...db.testimonials[index],
    author: req.body.author,
    text: req.body.text,
  };
  db.testimonials[index] = editedTestimonial;
  return res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  const indexToDelete = db.testimonials.findIndex(item => item.id == req.params.id);
  db.testimonials.splice(indexToDelete, 1);
  return res.json({message: 'OK'});
});

module.exports = router;