'use strict';

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(require('../route/auth-router.js'));
app.use(require('./error-middleware.js'));

app.all('/api/*', (req, res, next) => {res.sendStatus(404);});

const server = module.exports = {};

server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        console.log('server on', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error ('server already up'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        console.log('server down');
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('server not up'));
  });
};
