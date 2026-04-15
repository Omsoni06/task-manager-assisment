import mongoose from "mongoose";

export interface ITask {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  tags?: string[];
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: Date,
    tags: [String],
  },
  { timestamps: true },
);

// index (bonus)
taskSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<ITask>("Task", taskSchema);
