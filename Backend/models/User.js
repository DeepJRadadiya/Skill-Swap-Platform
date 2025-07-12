const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: null
  },
  profile_photo: {
    type: String,
    default: null
  },
  availability: {
    type: String,
    required: true
  },
  is_public: {
    type: Boolean,
    default: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Auto-update `updated_at` before save
userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const User = model('User', userSchema);
module.exports = User;
