const Task = require('../models/Task');

// Create task
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  if(!title) return res.status(400).json({ message: 'Title required' });
  const task = await Task.create({ title, description, dueDate, user: req.user._id });
  res.status(201).json(task);
};

// Get tasks (with filters)
const getTasks = async (req, res) => {
  const { filter } = req.query; // filter: today | week | completed | all
  const userId = req.user._id;
  const now = new Date();
  let criteria = { user: userId };

  if (filter === 'completed') criteria.completed = true;
  if (filter === 'today') {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(start); end.setDate(start.getDate()+1);
    criteria.dueDate = { $gte: start, $lt: end };
  }
  if (filter === 'week') {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(start); end.setDate(start.getDate()+7);
    criteria.dueDate = { $gte: start, $lt: end };
  }

  const tasks = await Task.find(criteria).sort({ createdAt: -1 });
  res.json(tasks);
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
