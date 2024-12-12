import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";
import { userSchema } from "../schema/userSchema.js";

export const signup = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //   Checking if user is already in database
    const email = value.email;

    const findIfUserExist = await UserModel.findOne({ email });
    if (findIfUserExist) {
      return res.status(401).send("User is already registered");
    } else {
      const hashedPassword = bcrypt.hashSync(value.password, 12);
      value.password = hashedPassword;
      const addUser = await UserModel.create(value);

      return res.status(201).send("User registered successfully");
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;
    //Find a user using their unique identifier
    const user = await UserModel.findOne({
      $or: [{ email: email }, { username: userName }],
    });
    if (!user) {
      res.status(401).json("No user found");
    } else {
      //Verify their password
      const correctPassword = bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        res.status(401).json("Invalid credentials");
      } else {
        //Generate a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "72h",
        });
        res.status(201).json({
          message: "Login successful",
          accessToken: token,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.userName,
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
