const mongoose = require('mongoose');
const { User } = require("../models")

module.exports.home = (req, res, next) => {
    res.render('home')
};

module.exports.list = (req, res, next) => {
    User.find()
      .then(users =>res.render('users/list', {users}))
      .catch((error) => next(error))
};

module.exports.register = (req, res, next) => {
    res.render('users/register')
}

module.exports.create = (req, res, next) => {

    function renderError (errors) {
        res.render("users/register", {
            user: req.body,
            errors
        })
    }

    const { email } = req.body
    User.findOne({ email })
    .then(user => {
        if (user) {
            renderError({email: "Email ya existe"})
        } else {
            const user = req.body
            return User.create(user)
            .then((user) => res.redirect('/users'))
        }
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            renderError(error.errors)
        } else {
          next(error)
        }
      })
  };

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.dologin = (req, res, next) => {

    function renderInvalidLogin() {
        res.render('users/login', {
          user: req.body,
          errors: { password: 'Invalid email or password' }
        });
      }
    
      const { email, password } = req.body;
      User.findOne({ email })
        .then(user => {
          if (!user) {
            renderInvalidLogin();
          } else {
            return user.checkPassword(password)
              .then(match => {
                if (match) {
                  req.session.userId = user.id;
                  res.redirect('/');
                } else {
                  renderInvalidLogin();
                }
              })
          }
        })
        .catch(error => next(error));

}

