import User from "../models/user.model.js"; // تأكد من المسار
import { SUCCESS, ERROR, FAIL } from "../utils/HttpsRequests.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//! GET all users
export const GetAllUsers = async (req, res) => {

  try {
    const users = await User.find({}, { __v: 0, password: 0 });
    res.status(SUCCESS).json(users);
  } catch (error) {
    res.status(ERROR).json({ error: error.message });
  }
};

//! POST create new user
export const CreateUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(FAIL).json({ error: "All fields are required" });
  }
  try {
    const hashPassWord = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassWord });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    newUser.token = token;
    const savedUser = await newUser.save();
    res
      .status(SUCCESS)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(ERROR).json({ error: error.message });
  }
};

//! login user

export const LoginUser = async (req, res) => {
  console.log(req.body);

  if (!req.body.email || !req.body.password) {
    return res.status(FAIL).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    const MatchedPassword = await bcrypt.compare(req.body.password, user.password);

    if (!user || !MatchedPassword) {
      return res.status(FAIL).json({ error: "User not found" });
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(SUCCESS).json({ message: "Login successful", token });
    }
  } catch (error) {
    res.status(ERROR).json({ error: error.message });
  }
};
