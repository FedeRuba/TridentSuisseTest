import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  user_id: ObjectId;
  taskName: string;
  date: Date;
}

const TaskSchema: Schema = new Schema({
  user_id: { type: ObjectId, required: true },
  taskName: { type: String, required: true },
  date: { type: Date } 
});

export default mongoose.model<ITask>('Task', TaskSchema);
