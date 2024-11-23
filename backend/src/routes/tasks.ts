import { Router } from "express";

const router = Router();

// Example of a route for getting all tasks
router.get("/", (req, res) => {
  res.json({ message: "Get all tasks" });
});

// You can define additional routes for adding, updating, deleting tasks here

export default router;
