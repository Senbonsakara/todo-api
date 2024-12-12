import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["extreme", "moderate", "low"],
    },
    taskDescription: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Add toJSON plugin
todoSchema.plugin(toJSON);

export const TodoModel = model("Todo", todoSchema);
