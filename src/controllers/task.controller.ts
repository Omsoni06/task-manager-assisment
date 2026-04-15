import { Request, Response } from "express";
import Task from "../models/task.model";
import { validateTask } from "../utils/validate";

//  CREATE TASK CONTROLLER
export const createTask = async (req: Request, res: Response) => {
  try {
    const errors = validateTask(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL (filters + pagination) CONTROLLER
export const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      status,
      priority,
      tags,
      dueBefore,
      sortBy = "createdAt",
      order = "desc",
      page = "1",
      limit = "10",
    } = req.query; // DESTRUCTURING QUERY

    const filter: any = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (tags) filter.tags = { $in: [tags] };

    if (dueBefore) {
      filter.dueDate = { $lte: new Date(dueBefore as string) };
    }

    const sortOrder = order === "asc" ? 1 : -1;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const tasks = await Task.find(filter)
      .sort({ [sortBy as string]: sortOrder })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: pageNum,
      data: tasks,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET TASK BY ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).lean();

    if (!task) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: task });
  } catch {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

// UPDATE TASK BY ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!task) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: task });
  } catch {
    res.status(400).json({ success: false, message: "Invalid data" });
  }
};

// DELETE TASK
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};
