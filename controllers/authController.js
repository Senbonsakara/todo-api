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
    const { email, password } = req.body;
    //Find a user using their unique identifier
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(401).json("Invalid email or password");
    } else {
      //Verify their password
      const correctPassword = bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        res.status(401).json("Invalid email or password");
      } else {
        //Generate a token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({
          message: "Login Successful",
          token: accessToken,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
