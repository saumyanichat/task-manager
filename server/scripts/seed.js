require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Task = require('../models/Task');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Task.deleteMany({});

  const user = await User.create({ name: 'Demo', email: 'demo@example.com', password: '123456' });
  await Task.create([
    { title: 'Buy groceries', user: user._id, dueDate: new Date(), description: 'Milk, eggs' },
    { title: 'Study React', user: user._id, dueDate: new Date(Date.now()+86400000), description: 'Hooks' }
  ]);

  console.log('Seeded DB');
  process.exit();
};

seed();
