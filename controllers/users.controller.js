const mongoose = require('mongoose');
const { users } = require("../models/task.model")
const User = require("../models/user.model")

module.exports.home = (req, res, next) => {
    res.render('home')
};

module.exports.list = (req, res, next) => {
    User.find()
      .then(users =>res.render('Users/list', {users}))
      .catch((error) => next(error))
};

module.exports.new = (req, res, next) => {
    res.render('users/new')
};

module.exports.create = (req, res, next) => {
    const user = req.body
  
    User.create(user)
      .then(() => res.redirect('/users'))
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          console.error(error);
          res.render("users/new", { errors: error.errors, user });
        } else {
          next(error);
        }
      })
  };