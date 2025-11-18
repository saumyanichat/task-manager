const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

router.use(protect); // protect all routes below

router.post('/', createTask);
router.get('/', getTasks); // optional ?filter=today|week|completed
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
