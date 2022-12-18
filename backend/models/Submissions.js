const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add student name']
  },
  rollno: {
    type: String,
    required: [true, 'Please add student roll no']
  },
  assignmentname: {
    type: String,
    required: [true, 'Please add assignment name']
  },
  answer: {
    type: String,
    required: [true, "Please add assignment questions"]
  },
  allotedmarks: {
    type: String,
  },
  feedback: {
    type: String,
  }
}, 
{
  timestamps: true
}
);

module.exports = Submission = mongoose.model('submission', SubmissionSchema);