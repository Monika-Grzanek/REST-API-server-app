const Concert = require('./../models/concert.model.js');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
      res.json( await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const con = await Concert.findOne().skip(rand);
      if(!con) res.status(404).json( { message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(!con) res.status(404).json({ message: 'Not found'});
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err});
    }
};

exports.getByPerformer = async (req, res) => {
  try {
    const per = await Concert.find({performer: req.params.performer});
    if(!per) res.status(404).json({ message: 'Not found'});
    else res.json(per);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const gen = await Concert.find({ genre: req.params.genre });
    if(!gen) res.status(404).json({ message: 'Not found' });
    else res.json(gen);
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const priceMin = req.params.price_min;
    const priceMax = req.params.price_max;
    const pri = await Concert.find({ price: {$gte: priceMin, $lte: priceMax}});
    if(!pri) res.status(404).json({ message:'Not found' });
    else res.json(pri);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const getDay = await Concert.find({ day: req.params.day})
    if(!getDay) res.status(404).json({ message: 'Not found' });
    else res.json(getDay);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {
    try {
      const clean = sanitize(req.body);
      const { performer, genre, price, day, image } = clean;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putItem =  async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      await Concert.updateOne({ _id: req.params.id} , { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK '});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteItem = async (req, res) => {
    try {
      const indexToDelete = await Concert.findById(req.params.id);
      if(indexToDelete) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK '});
      }
      else res.status(404).json({ message: 'Not found... '});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};