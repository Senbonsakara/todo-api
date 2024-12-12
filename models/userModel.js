import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    termsAndConditions: { type: Boolean },
    userProfile: { type: Types.ObjectId, ref: "UserProfile" },
  },
  {
    timestamps: true,
  }
);

// Add toJSON plugin
userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
