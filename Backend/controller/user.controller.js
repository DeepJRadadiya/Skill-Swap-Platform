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
      userId: newUser._id,
      userType: newUser.is_admin,
    });

  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports = { register };
