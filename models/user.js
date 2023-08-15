import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
const TaskSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    priority: {
      type: String,
    },
    tag: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", TaskSchema);

export {User,Task};
