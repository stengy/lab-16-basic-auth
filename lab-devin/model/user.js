'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username:{type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  email: {type String, required: true, unique: true},
  tokenSeed: {type: String, required: true, unique: true},
});

userSchema.methods.passwordHashCreate = function(password) {
  return bcrypt.hash(password, 8)
  .then(hash => {
    this.passwordHash = hash;
    return this;
  });
};

userSchema.methods.passwordHashCompare = function(password) {
  return bcrypt.compare(password, this.passwordHash)
  .then(isCorrect => {
    if(isCorrect)
      return this;
    throw new Error('invalid password');
  });
};
