import { ITask } from "../models/task.model";

export const validateTask = (data: Partial<ITask>): string[] => {
  const errors: string[] = [];

  if (!data.title || data.title.length < 3 || data.title.length > 100) {
    errors.push("Title must be 3-100 characters");
  }

  if (data.status && !["todo", "in-progress", "done"].includes(data.status)) {
    errors.push("Invalid status");
  }

  if (data.priority && !["low", "medium", "high"].includes(data.priority)) {
    errors.push("Invalid priority");
  }

  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    errors.push("Due date must be in future");
  }

  return errors;
};
