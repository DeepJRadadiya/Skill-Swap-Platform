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

const insertManySkills = async (req, res) => {
  try {
    const { skills } = req.body; // expects an array of skill names

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "Please provide an array of skill names." });
    }

    const trimmedSkills = skills.map(name => ({ name: name.trim() }));

    // Optional: Filter out duplicates that already exist in DB
    const existingSkills = await Skill.find({ name: { $in: skills } }).select("name");
    const existingSkillNames = existingSkills.map(skill => skill.name);

    const uniqueSkills = trimmedSkills.filter(skill => !existingSkillNames.includes(skill.name));

    if (uniqueSkills.length === 0) {
      return res.status(409).json({ message: "All skills already exist." });
    }

    const insertedSkills = await Skill.insertMany(uniqueSkills);

    res.status(201).json({
      message: `${insertedSkills.length} skill(s) created successfully.`,
      inserted: insertedSkills
    });

  } catch (error) {
    console.error("Error in insertManySkills:", error.message);
    res.status(500).json({ message: "Internal server error while inserting skills." });
  }
};


const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}, { name: 1 }); // Only return 'name' field
    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error.message);
    res.status(500).json({ message: "Internal server error while fetching skills." });
  }
};




module.exports = { createSkill , getAllSkills ,insertManySkills };
