import { multerSaveFilesOrg } from "multer-savefilesorg";
import multer from "multer";

export const remoteUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/profile_picture/*",
  }),
});

export const remoteUploadImage = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/images/*",
  }),
});
