const { Schema, model, Types } = require('mongoose');

const userSkillSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill_id: {
    type: Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  skill_role: {
    type: Number, // 0 = offered, 1 = wanted
    enum: [0, 1],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const UserSkill = model('UserSkill', userSkillSchema);
module.exports = UserSkill;
