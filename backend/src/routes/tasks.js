// routes/tasks.js
import express from 'express';
import Task from '../models/Task'; // Adjust the path to your Task model

const router = express.Router();

// Route to add a new task
router.post('/add', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status: status || 'pending', // Default to pending if no status is provided
    });
    
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error: error.message });
  }
});

// Route to edit a task
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, {
      title,
      description,
      status,
    }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error editing task', error: error.message });
  }
});

// Route to delete a task
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

export default router;
