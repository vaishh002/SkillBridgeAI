const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../data/mock_users.json');

// Ensure database file and directory exist
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2), 'utf8');
}

function readMockDB() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('⚠️ Failed to read mock DB:', err.message);
    return [];
  }
}

function writeMockDB(users) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('⚠️ Failed to write mock DB:', err.message);
  }
}

class MockUserInstance {
  constructor(data) {
    Object.assign(this, data);
    
    // Mongoose virtual id mapping
    this.id = this._id;
    
    // Ensure roadmap exists and elements have ids
    if (!this.roadmap) {
      this.roadmap = [];
    }
    this.roadmap.forEach(item => {
      if (!item._id) {
        item._id = 'item_' + Math.random().toString(36).substr(2, 9);
      }
    });

    // Attach subdocument .id() helper used by roadmapController.js
    const self = this;
    this.roadmap.id = function(itemId) {
      return self.roadmap.find(item => item._id === itemId || item.id === itemId);
    };
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  async save(options) {
    const users = readMockDB();
    const index = users.findIndex(u => u._id === this._id);

    // Save state (strip out the dynamic function helper)
    const serialized = { ...this };
    if (serialized.roadmap && typeof serialized.roadmap.id === 'function') {
      delete serialized.roadmap.id;
    }
    delete serialized.id;

    if (index >= 0) {
      users[index] = serialized;
    } else {
      users.push(serialized);
    }
    
    writeMockDB(users);

    // Re-attach helper
    const self = this;
    this.roadmap.id = function(itemId) {
      return self.roadmap.find(item => item._id === itemId || item.id === itemId);
    };

    return this;
  }

  toJSON() {
    const user = { ...this };
    delete user.password;
    delete user.__v;
    delete user.id;
    if (user.roadmap && typeof user.roadmap.id === 'function') {
      delete user.roadmap.id;
    }
    return user;
  }
}

const MockUser = {
  create: async function(data) {
    const users = readMockDB();
    
    // Hash the password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    
    const newUser = {
      _id: 'mock_u_' + Math.random().toString(36).substr(2, 9),
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role || 'student',
      isActive: true,
      lastLogin: new Date().toISOString(),
      targetRole: '',
      learningStyle: '',
      weeklyHours: 5,
      careerReadinessScore: 0,
      roadmap: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    writeMockDB(users);
    
    return new MockUserInstance(newUser);
  },

  findOne: function(query) {
    const users = readMockDB();
    let found = null;
    
    if (query.email) {
      const emailLower = query.email.toLowerCase();
      found = users.find(u => u.email === emailLower);
    } else if (query._id) {
      found = users.find(u => u._id === query._id);
    }
    
    const result = found ? new MockUserInstance(found) : null;
    
    // Return a chainable thenable query
    const promise = Promise.resolve(result);
    promise.select = function(fields) {
      return promise; // Password is included by default, so we just resolve normally
    };
    return promise;
  },

  findById: function(id) {
    const users = readMockDB();
    const found = users.find(u => u._id === id);
    const result = found ? new MockUserInstance(found) : null;
    
    const promise = Promise.resolve(result);
    promise.select = function(fields) {
      return promise;
    };
    return promise;
  }
};

module.exports = MockUser;
