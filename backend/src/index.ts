import express from "express";
import tasksRoutes from "./routes/tasks.js";

const app = express();

// Middleware
app.use(express.json());

// Basic route to confirm server is running
app.get("/", (req, res) => {
  res.send("Hello, World! Backend is working.");
});

// Use the tasks routes for any task-related API calls
app.use("/tasks", tasksRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
