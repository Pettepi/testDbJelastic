require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const demoSchema = mongoose.Schema({
    test: String,
    more: Number
});

const Demo = mongoose.model('Demo', demoSchema);

// use 27017 and test!
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`).then(() =>{
  console.log('Connected successfully.');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});


app.get('/', (req, res) =>{
    Demo.create({ test:'Hello', more: 3 }).then(post => {
        console.log(post.id);
        res.send('Created dummy data: ' + post.id)
    });
});

app.get('/all', (req, res)=>{
   Demo.find().then(all =>{
      console.log(all);
      res.send(all);
   });
});