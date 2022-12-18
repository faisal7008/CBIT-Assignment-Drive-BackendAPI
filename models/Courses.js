const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add course name'],
    unique: true 
  },
  semester: {
    type: Number,
    required: [true, 'Please add semester number']
  }
}, 
{
  timestamps: true
});

module.exports = Course = mongoose.model('courses', CourseSchema);