const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  stud_name: {
    type: String,
    required: [true, 'Please add student name']
  },
  rollno: {
    type: String,
    required: [true, 'Please add student roll no']
  },
  assignment_id: {
    type: String,
    required: [true, 'Please add assignment id']
  },
  answer: {
    type: String,
    required: [true, "Please add assignment questions"]
  },
  alloted_marks: {
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