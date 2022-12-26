const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add course name'],
    unique: true 
  },
  semester: {
    type: Number,
    required: [true, 'Please add semester number']
  },
  mentor: {
    type: String, // teacher id mentor this class
  },
  courses: [{
    type: String,
    // required: [true, 'Please add all the courses related to this class'] 
  }]
}, 
{
  timestamps: true
});

module.exports = Class = mongoose.model('class', ClassSchema);