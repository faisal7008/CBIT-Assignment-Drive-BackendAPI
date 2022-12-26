const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add assignment name"],
    },
    createdBy: {
      type: String,
      required: true,
      // ref: 'User',
    },
    course: {
      type: String,
      required: [true, "Please select your course id"],
      ref: 'course'
    },
    classId: {
      type: String,
      required: [true, "Please select your course id"],
      ref: 'class'
    },
    totalmarks: {
      type: Number,
      required: [true, "Please add marks"],
    },
    duedate: {
      type: Date,
      required: [true, "Please add a due date"],
    },
    question: {
      type: String,
      required: [true, "Please add assignment questions"],
    },
    submissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'submission'
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = Assignment = mongoose.model("assignment", AssignmentSchema);
