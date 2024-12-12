import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userProfileSchema = new Schema(
  {
    profilePicture: { type: String },
    location: { type: String },
    sex: { type: String, enum: ["male", "female"] },
    dateOfBirth: { type: Date },
    contact: { type: String },
    user: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

userProfileSchema.plugin(toJSON);

export const UserProfileModel = model("UserProfile", userProfileSchema);
