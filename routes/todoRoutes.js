import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from "../controllers/todoController.js";
import { remoteUploadImage } from "../middleware/uploadMiddleware.js";

const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.post(
  "/",
  remoteUploadImage.fields([{ name: "image", maxCount: 1 }]),
  postTodo
);
todoRouter.get("/", getTodos);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
