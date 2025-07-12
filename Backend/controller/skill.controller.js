const Skill = require('../models/Skills');

const createSkill = async (req, res) => {
  try {
    const { name } = req.body;

    // Skill already validated by Zod at this point
    const existingSkill = await Skill.findOne({ name: name.trim() });
    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists." });
    }

    const newSkill = new Skill({ name: name.trim() });
    await newSkill.save();

    res.status(201).json({
      message: "Skill created successfully",
      skill: newSkill.name
    });

  } catch (error) {
    console.error("Error in createSkill:", error.message);
    res.status(500).json({ message: "Internal server error while creating skill." });
  }
};



module.exports = { createSkill };
