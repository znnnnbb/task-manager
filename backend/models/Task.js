// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User
  status: {
    type: String,
    enum: ['pending', 'completed'],  // Only allow 'pending' or 'completed'
    default: 'pending',  // Default status is 'pending'
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

export { Task };
