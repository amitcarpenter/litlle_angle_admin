const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacher_profile_image: {
    type: String,
    required: true
  },
  teacher_name: {
    type: String,
    required: true
  },
  teacher_designation: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: false
  },
  twitter: {
    type: String,
    required: false
  },
  facebook: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
