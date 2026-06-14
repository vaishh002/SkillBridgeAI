const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name must not exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // don't return password by default
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    targetRole: {
      type: String,
      default: '',
    },
    learningStyle: {
      type: String,
      enum: ['Video', 'Reading', 'Practical', ''],
      default: '',
    },
    weeklyHours: {
      type: Number,
      default: 5,
    },
    careerReadinessScore: {
      type: Number,
      default: 0,
    },
    roadmap: [
      {
        skillName: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['not_started', 'in_progress', 'completed'],
          default: 'not_started',
        },
        completedAt: {
          type: Date,
        },
        resources: [
          {
            title: { type: String, required: true },
            type: { type: String, enum: ['video', 'doc', 'practice'], required: true },
            url: { type: String, required: true },
          }
        ]
      }
    ]
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const MongooseUserModel = mongoose.model('User', userSchema);
const MockUser = require('./MockUser');

module.exports = new Proxy(MongooseUserModel, {
  get(target, prop) {
    if (global.useMockDb) {
      if (prop in MockUser) {
        return MockUser[prop];
      }
    }
    return target[prop];
  }
});

