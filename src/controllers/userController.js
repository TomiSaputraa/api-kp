const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/user/register
// @acces public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Semua bidang tidak boleh kosong");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User sudah terdaftar");
  }

  // gunakan decrypt agar tidak mengirim password mentah

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password : ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("User created : " + user);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register user" });
});

// @desc Login a user
// @route POST /api/user/login
// @acces public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Semua data tidak boleh kosong");
  }

  const user = await User.findOne({ email });

  // compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accesToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// @desc Current user info
// @route GET /api/user/current
// @acces private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
