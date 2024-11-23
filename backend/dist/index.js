import express from 'express';
import tasksRoutes from './routes/tasks.js';  // Import the routes
import authRoutes from './routes/auth.js';
import cors from 'cors';
import mongoose from 'mongoose';
  // This will allow all origins by default

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Basic route to confirm server is running
app.get("/", (req, res) => {
  res.send("Hello, World! Backend is working.");
});

// Use the tasks routes for any task-related API calls
app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
