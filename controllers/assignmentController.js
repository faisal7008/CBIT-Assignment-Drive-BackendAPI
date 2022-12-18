const asyncHandler = require("express-async-handler");
const Assignment = require("../models/Assignments");
const Submission = require("../models/Submissions");
const cloudinary = require("../utils/cloudinary")
// const Student = require("../models/Student");
// const Submission = require("../models/Assignments");

// @desc    Get Submisssions
// @route   GET /api/assignments
// @access  Private

const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ user: req.user.id });
  res.status(200).json(assignments);
});

// @desc    Get Submisssions
// @route   GET /api/assignments
// @access  Private

const getSubmissions = asyncHandler(async (req, res) => {
  // await Assignment.findOne({_id: req.params.id})
  await Assignment.find()
    .populate({path:"submissions", select: {"name": 1, "rollno": 1, "answer": 1}})
    .exec((err, assignment) => {
      if(err){
        return res.status(400).json(err)
      } else {
        return res.status(200).json(assignment)
      }
    })
});

// @desc    Add Assigments by teacher
// @route   POST /api/assignments
// @access  Private

const addAssignment = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add assignment name");
  }
  if (!req.body.createdBy) {
    res.status(400);
    throw new Error("Please add creator name");
  }
  if (!req.body.course) {
    res.status(400);
    throw new Error("Please select course");
  }
  if (!req.body.totalmarks) {
    res.status(400);
    throw new Error("Please add total marks");
  }
  if (!req.body.duedate) {
    res.status(400);
    throw new Error("Please add duedate");
  }
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload file");
  }

  // Check for user
  // if(!req.user){
  //     res.status(401)
  //     throw new Error('User not found')
  // }
  // const url = req.protocol + "://" + req.get("host");

  
  const file = req.files.question
  const imageData = await cloudinary.uploader.upload(file.tempFilePath, {folder: "assignments"}, (err, res) => console.log(err))

  const assignment = await Assignment.create({
    name: req.body.name,
    createdBy: req.body.createdBy,
    course: req.body.course,
    totalmarks: req.body.totalmarks,
    duedate: req.body.duedate,
    question: imageData.secure_url,
  });

  res.status(200).json(assignment);
});




module.exports = {
  getAssignments,
  getSubmissions,
  addAssignment,
};
