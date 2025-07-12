const { z } = require('zod');

const skillSchema = z.object({
  name: z
    .string({ required_error: "Skill name is required" })
    .trim()
    .min(2, { message: "Skill name must be at least 2 characters long" })
});

module.exports = { skillSchema };

