import express from 'express';
const router = express.Router();

// Sample task-related routes
router.get('/', (req, res) => {
  res.send('Getting all tasks');
});

router.post('/', (req, res) => {
  res.send('Creating a new task');
});

// Export the router as default
export default router;
