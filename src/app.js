'use strict';

// 3rd Party Resources
const express = require('express');
const mongoose = require('mongoose');
const router = require('./auth/router.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');


// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('*', notFoundHandler);
app.use(errorHandler);


function start(port) {
  mongoose.connect('mongodb://localhost:27017/auth', {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true })
  .then(() => {
    console.log('connected to database successfully')
    app.listen(port, () => console.log('server up'));
  })
  .catch(e => console.error('Could not start server', e.message));
}

module.exports = {
    app,
    start
}