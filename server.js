const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.filter((item) => item.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
    let item = db[Math.floor(Math.random() * db.length )];
    res.json(item);
});

app.post('/testimonials', (req, res) => {
    const newTestimonial = {
      id: uuidv4(),
      author: req.body.author,
      text: req.body.text,
    };
    db.push(newTestimonial);
    return res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
    const getTestimonialById = db.filter((item) => item.id == req.params.id);
    const indexOfTestimonial = db.indexOf(editedTestimonials);
    const newTestimonial = {
      ...getTestimonialById,
      author: req.body.author,
      text: req.body.text,
    };
    db[indexOfTestimonial] = newTestimonial;
    return res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
    const getTestimonialById = db.filter((item) => item.id == req.params.id);
    const indexOfTestimonial = db.indexOf(getTestimonialById);
    db.splice(indexOfTestimonial, 1);
    return res.json({message: 'OK'});
});
  
app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});