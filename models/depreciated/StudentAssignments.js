// const mongoose = require('mongoose');

// const StudentSubmissionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add assignment name'], 
//     unique: true,
//   },
//   createdBy: {
//     type: String,
//     required: [true, 'Please add assignment creator'],
//   },
//   student: {
//     type: String,
//     required: [true, 'Please add student']
//   },
//   rollno: {
//     type: String,
//     required: [true, 'Please add student roll no']
//   },
//   course: {
//     type: String,
//     required: [true, 'Please select your course'],
//     ref: 'Course'
//   },
//   totalmarks: {
//     type: Number,
//     required: [true, 'Please add total marks']
//   },
//   allotedmarks: {
//     type: Number,
//   },
//   duedate: {
//     type: Date,
//     required: [true, "Please add a due date"]
//   },
//   question: {
//     type: String,
//     required: [true, "Please add assignment questions"]
//   },
//   answer: {
//     type: String,
//     required: [true, "Please add assignment questions"]
//   }
// }, 
// {
//   timestamps: true
// });

// module.exports = StudentAssignment = mongoose.model('studentsubmissions', StudentSubmissionSchema);