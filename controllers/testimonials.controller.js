const Testimonial = require('./../models/testimonial.model.js');

exports.getAll = async (req, res) => {
    try {
      res.json( await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const testi = await Testimonial.findOne().skip(rand);
      if(!testi) res.status(404).json( { message: 'Not found' });
      else res.json(testi);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const testi = await Testimonial.findById(req.params.id);
      if(!testi) res.status(404).json({ message: 'Not found'});
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err});
    }
};

exports.postItem = async (req, res) => {
    try {
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ author: author, text: text });
      await newTestimonial.save();
      res.json({ message: 'OK'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putItem =  async (req, res) => {
    const { author, text }= req.body;
    try {
      await Testimonial.updateOne({ _id: req.params.id} , { $set: { author: author, text: text }});
      res.json({ message: 'OK '});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteItem = async (req, res) => {
    try {
      const indexToDelete = await Testimonial.findById(req.params.id);
      if(indexToDelete) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK '});
      }
      else res.status(404).json({ message: 'Not found... '});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}