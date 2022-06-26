const { tasks } = require("../services/tasks.service");
const Task = require("../services/tasks.service");

module.exports.list = (req, res, next) => {
  // TODO: use Task.find() to get all tasks and render tasks list
  // Task.find() returns a promise that resolves with task list
  Task.find()
    .then(tasks =>res.render('tasks/list', {tasks}))
    .catch(error => console.log (error))
};

module.exports.detail = (req, res, next) => {
  // TODO: use Task.findById(id) to get task by id and render task detail
  // Task.findById() returns a promise that resolves with task detail (or undefined if it does not exist)
  Task.findById(req.params.id)
    .then(task => res.render('tasks/detail', {task}))
    .catch(error => console.log (error))
};

module.exports.new = (req, res, next) => {
  // TODO: use Task.findById(id) to get task by id and render task detail

  res.render('tasks/new')
};

module.exports.create = (req, res, next) => {
  // TODO: use Task.create({...}) to create a new Task and redirect to list
  // Task.create() returns a promise that resolves with created task detail
  const data = {title: req.body.title}

  Task.create(data)
    .then(task => res.redirect('/tasks'))
    .catch(error => console.log(error))
};

module.exports.delete = (req, res, next) => {
  // TODO: use Task.findByIdAndDelete(id) to delete a task and redirect to list
  // Task.findByIdAndDelete() returns a promise that resolves with undefined
  Task.findByIdAndDelete(req.params.id)
    res.redirect('/tasks')
};
