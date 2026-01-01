import { Task } from "./task.model.js";
import mongoose from "mongoose";

export const createTask = async (data, userId) => {
  return await Task.create({
    ...data,
    user: userId,
  });
};

export const getTasks = async (user) => {
  if (user.role === "ADMIN") {
    return await Task.find().populate("user", "name email");
  }

  return await Task.find({ user: user.id });
};


export const getTaskById = async (taskId, user) => {
  const task = await Task.findById(taskId);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  // Convert both IDs to strings safely
  const taskUserId = task.user.toString();
  const currentUserId = user.id.toString(); // Assuming req.user.id is string from JWT

  if (user.role !== "ADMIN" && taskUserId !== currentUserId) {
    const error = new Error("Unauthorized access");
    error.statusCode = 403;
    throw error;
  }

  return task; // <-- only return after RBAC/ownership check
};


export const updateTask = async (taskId, data, user) => {
  const task = await getTaskById(taskId, user);
  Object.assign(task, data);
  return await task.save();
};

export const deleteTask = async (taskId, user) => {
  const task = await getTaskById(taskId, user);
  await task.deleteOne();
  return true;
};
