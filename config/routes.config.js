const express = require("express");
const router = express.Router();

const tasks = require('../controllers/tasks.controller')
const users = require('../controllers/users.controller')

router.get('/tasks', tasks.list)
router.get('/tasks/new', tasks.new)
router.get('/tasks/:id', tasks.detail)
router.post('/tasks', tasks.create)
router.post('/tasks/:id/delete', tasks.delete)

router.get('/users', users.list)
router.get('/users/new', users.new)
router.post('/users', users.create)

router.get('/', users.home)

module.exports = router;
