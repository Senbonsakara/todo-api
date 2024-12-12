import { UserModel } from "../models/userModel.js";
import { UserProfileModel } from "../models/userProfileModel.js";
import { userProfileSchema } from "../schema/userProfileSchema.js";

export const postUserProfile = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files?.profilePicture[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //Get user id from session or request

    const id = req.session?.user?.id || req?.user.id;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newProfile = await UserProfileModel.create({
      ...value,
      user: id,
    });

    user.userProfile = newProfile.id;

    await user.save();

    res
      .status(201)
      .json({ message: "User Profile added successfully", newProfile });
  } catch (error) {
    console.log(error);
  }
};
