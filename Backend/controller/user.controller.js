const bcrypt = require("bcryptjs");
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, location, availability,  profile_photo, is_public } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with all fields
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      location,
      profile_photo: profile_photo || null,
      availability,
      is_public: is_public ?? true,           // use passed value or default to true
      is_admin: false,         // determine admin role
    //   is_admin: userType === "admin",         // determine admin role
      rating: 0                                // initial rating
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: is_public },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    // Send response
    res.status(201).json({
      message: "Registration successful",
      token,
      userName: newUser.name,
      userId: newUser._id,
      userType: newUser.is_admin ? "admin" : "user",

    });

  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {  id: user._id, email: user.email, role: user.is_public},
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      userName: newUser.name,
      userId: user._id,
      userType: user.is_admin ? "admin" : "user",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register,login };
