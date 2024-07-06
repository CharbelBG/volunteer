import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//the async handler will remove the overhead of adding ty catch blocks
//and will allow us to use the custom middleware we created
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Wrong payload, must have email and password");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Wrong Credentials");
  }

  generateToken(res, user._id);
  res.status(201).json({ user });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Wrong payload, must send name, password and email");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const createUser = await User.create({
    email,
    name,
    password,
  });

  if (createUser) {
    generateToken(res, createUser._id);
    res.status(201).json({ createUser });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "user profile",
    user: req.user,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const user = await User.findById(req.user._id);
  try {
    user.name = name;
    await user.save();
    res.status(200).json({ message: "user updated!" });
  } catch (err) {
    res.status(400);
    throw new Error("could not update user name");
  }
});

export { login, registerUser, getUser, updateUserProfile };
