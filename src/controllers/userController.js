const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abc&1234";

const signup = async (req, res) => {
  // Existing User Check
  // Hashed Password (Password Encryption using bcrypt library)
  // User Creation
  // Token Generation

  const { userName, email, password } = req.body;
  try {
    const exisingUser = await userModel.findOne({ email: email });
    if (exisingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      userName: userName,
    });

    const token = jwt.sign({ email: email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exisingUser = await userModel.findOne({ email: email });
    if (!exisingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchedPassword = await bcrypt.compare(
      password,
      exisingUser.password
    );
    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: exisingUser.email, id: exisingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: exisingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
