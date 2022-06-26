const express = require("express");
const router = express.Router();

const tasks = require('../controllers/tasks.controller')

// TODO: GET /tasks -> render task list with filters
router.get('/tasks', tasks.list)

// TODO: GET /tasks/new -> render task form
router.get('/tasks/new', tasks.new)

// TODO: GET /tasks/:id -> render task detail
router.get('/tasks/:id', tasks.detail)

// TODO: POST /tasks -> create task and redirect to list
router.post('/tasks', tasks.create)

// TODO: POST /tasks/:id/delete -> delete task and redirect to list
router.post('/tasks/:id/delete', tasks.delete)

// Check tasks.controller.js exported functions!

module.exports = router;
