const { tasks } = require("../models/task.model")
const Task = require("../models/task.model")

module.exports.list = (req, res, next) => {
  Task.find()
    .then(tasks =>res.render('tasks/list', {tasks}))
    .catch(error => console.log (error))
};

module.exports.detail = (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => res.render('tasks/detail', {task}))
    .catch(error => console.log (error))
};

module.exports.new = (req, res, next) => {
  res.render('tasks/new')
};

module.exports.create = (req, res, next) => {
  const data = req.body

  Task.create(data)
    .then(() => res.redirect('/tasks'))
    .catch(error => console.log(error))
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id

  Task.findByIdAndDelete(id)
    .then(() => res.redirect('/tasks'))
    .catch(error => console.log(error))
};
