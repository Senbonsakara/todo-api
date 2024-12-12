import { Router } from "express";
import { postUserProfile } from "../controllers/userProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { remoteUpload } from "../middleware/uploadMiddleware.js";

const userProfileRouter = Router();

userProfileRouter.post(
  "/",
  authMiddleware,
  remoteUpload.fields([{ name: "profilePicture", maxCount: 1 }]),
  postUserProfile
);

export default userProfileRouter;
