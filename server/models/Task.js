const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
  timestamps: true
});

taskSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
