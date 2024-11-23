import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
