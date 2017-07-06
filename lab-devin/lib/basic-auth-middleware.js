'use strict';

const User = require('../model/user.js');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization)
    return next(new Error('authorization failed, none provided'));

  let encoded = authorization.split('Basic ')[1];
  if(!encoded)
    return next(new Error('authorization failed, no basic auth'));

  let decoded = new Buffer(encoded, 'base64').toString();
  let [username, password] = decoded.split(':');

  if(!username || !password)
    return next(new Error('unauthorized or missing username and/or password'));

  User.findOne({username})
  .then(user => {
    if(!user)
      return next(new Error('user does not exist'));
    return user.passwordHashCompare(password);
  })
  .then(user => {
    req.user = user;
    next();
  })
  .catch(() => {
    next(new Error('unauthorized findOne, basic-auth'));
  });
};
