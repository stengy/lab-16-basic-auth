'use strict';

module.exports = (err, req, res, next) => {

  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('data and salt arguments required'))
    return res.sendStatus(401);

  if(err.message.toLowerCase().includes('unauthorized username or password missing'))
    return res.sendStatus(401);

  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409);

  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  res.sendStatus(500);
};
