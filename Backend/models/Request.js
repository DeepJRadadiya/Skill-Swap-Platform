const { Schema, model, Types } = require('mongoose');

const RequestSkillSchema = new Schema({
  offered_skill_id: {
    type: Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  wanted_skill_id: {
    type: Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  offered_user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  wanted_user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String, // 0 = offered, 1 = wanted
    // enum: [0, 1],
    required: true
  },
  accept:{
    type: Number,
  },
  pending:{
    type: Number,
  },
  reject:{
    type: Number,
  }
});

const RequestSkill = model('RequestSkill', RequestSkillSchema);
module.exports = RequestSkill;
