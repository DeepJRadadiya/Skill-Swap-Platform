const { Schema, model } = require('mongoose');

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

const Skill = model('Skill', skillSchema);
module.exports = Skill;
