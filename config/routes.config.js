const express = require("express");
const router = express.Router();
const { tasks, auth, users } = require('../controllers')


router.get('/tasks', tasks.list)
router.get('/tasks/new', tasks.new)
router.get('/tasks/:id', tasks.detail)
router.post('/tasks', tasks.create)
router.post('/tasks/:id/delete', tasks.delete)

router.get('/users', users.list)
router.get('/users/register', users.register)
router.post('/users', users.create)

router.get('/', users.home)

module.exports = router;
