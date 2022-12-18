// const mongoose = require('mongoose');

// const TeacherAssignmentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add assignment name'], 
//   },
//   createdBy: {
//     type: String,
//     required: true,
//     // ref: 'User',
//   },
//   course: {
//     type: String,
//     required: [true, 'Please select your course'],
//     ref: 'Course'
//   },
//   marks: {
//     type: Number,
//     required: [true, 'Please add marks']
//   },
//   duedate: {
//     type: Date,
//     required: [true, "Please add a due date"]
//   },
//   question: {
//     type: String,
//     required: [true, "Please add assignment questions"]
//   }
// }, 
// {
//   timestamps: true
// });

// module.exports = TeacherAssignment = mongoose.model('teachers', TeacherAssignmentSchema);