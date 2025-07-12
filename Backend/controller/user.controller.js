const bcrypt = require("bcryptjs");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const UserSkill = require("../models/UserSkill");

const register = async (req, res) => {
  try {
    const { name, 
      email, 
      password, 
      location, 
      availability,  
      profile_photo, 
      is_public,
      offered_skills,
      wanted_skills } = req.body;

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

    const offeredEntries = offered_skills?.map(skillId => ({
      user_id: newUser._id,
      skill_id: skillId,
      skill_role: 0,
    }));

    // Insert Wanted Skills (1)
    const wantedEntries = wanted_skills?.map(skillId => ({
      user_id: newUser._id,
      skill_id: skillId,
      skill_role: 1,
    }));

    const allSkills = [...(offeredEntries || []), ...(wantedEntries || [])];

    if (allSkills.length > 0) {
      await UserSkill.insertMany(allSkills);
    }



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

const getAllUsersWithSkills = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    // For each user, fetch their offered and wanted skills
    const usersWithSkills = await Promise.all(
      users.map(async (user) => {
        const userSkills = await UserSkill.find({ user_id: user._id }).populate("skill_id");

        const offeredSkills = userSkills
          .filter(skill => skill.skill_role === 0)
          .map(skill => skill.skill_id.name);

        const wantedSkills = userSkills
          .filter(skill => skill.skill_role === 1)
          .map(skill => skill.skill_id.name);

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          profile_photo: user.profile_photo,
          availability: user.availability,
          is_public: user.is_public,
          is_admin: user.is_admin,
          rating: user.rating,
          created_at: user.created_at,
          offered_skills: offeredSkills,
          wanted_skills: wantedSkills
        };
      })
    );

    res.status(200).json({ users: usersWithSkills });

  } catch (error) {
    console.error("Error in getAllUsersWithSkills:", error.message);
    res.status(500).json({ message: "Failed to fetch users with skills." });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const updateData = req.body;

    if (req.file) {
      updateData.profile_photo = req.file.filename; // ✅ only file name
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
      message: "User profile updated",
      user: {
        ...updatedUser.toObject(),
        profile_photo_url: `${req.protocol}://${req.get("host")}/uploads/${updatedUser.profile_photo}`
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

module.exports = { register,login,getAllUsersWithSkills,updateUserProfile };
