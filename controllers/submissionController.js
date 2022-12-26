const asyncHandler = require("express-async-handler");
const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");
const cloudinary = require("../utils/cloudinary")

// @desc    Get Submisssions
// @route   GET /api/assignments
// @access  Private

const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ user: req.user.id });
  res.status(200).json(assignments);
});

// @desc    Get Submisssions by teacher
// @route   GET /api/assignments
// @access  Private

const getSubmissions = asyncHandler(async (req, res) => {
  // await Assignment.findOne({_id: req.params.id})
  await Assignment.find()
    .populate("submissions")
    .exec((err, assignment) => {
      if(err){
        return res.status(400).json(err)
      } else {
        return res.status(200).json(assignment)
      }
    })
});


// @desc    Add Submission by student
// @route   PUT /api/submissions
// @access  Private

const addSubmission = asyncHandler(async (req, res) => {
  if (!req.body.stud_name) {
    res.status(400);
    throw new Error("Please add name");
  }

  if (!req.body.rollno) {
    res.status(400);
    throw new Error("Please add rollno");
  }

  if (!req.body.assignment_id) {
    res.status(400);
    throw new Error("Please add assignment name");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload assignment");
  }

  // if (!req.body.allotedMarks) {
  //   res.status(400);
  //   throw new Error("Marks not alloted yet");
  // }

  // Check for user
  // if(!req.user){
  //     res.status(401)
  //     throw new Error('User not found')
  // }

  // const url = req.protocol + "://" + req.get("host");
  const file = req.files.answer
  const imageData = await cloudinary.uploader.upload(file.tempFilePath, {folder: "submissions"}, (err, res) => console.log(err))

  const submission = await Submission.create({
    stud_name: req.body.stud_name,
    rollno: req.body.rollno,
    assignment_id: req.body.assignment_id,
    alloted_marks: "NA",
    feedback: "",
    answer: imageData.secure_url
    // answer: url + "/uploads/student/" + req.file.filename,
  });

  await Assignment.findByIdAndUpdate(submission.assignment_id, {$push: {submissions: submission._id}}, {new: true})
    .then(p => res.status(200).json({submission}))
    .catch(err => res.status(200).json(err))
  // res.status(200).json(submission);
});

const updateSubmission = asyncHandler(
  async (req, res) => {
      const submission = await Submission.findById(req.params.id)
      if(!submission){
          res.status(400)
          throw new Error('Not yet submitted')
      }

      // Check for user
      if(!req.user){
          res.status(401)
          throw new Error('User not found')
      }


      const file = req.files.answer
      const imageData = await cloudinary.uploader.upload(file.tempFilePath, {folder: "submissions"}, (err, res) => console.log(err))

      req.body.answer = imageData.secure_url

      const updatedSubmission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
      })

      res.status(200).json(updatedSubmission)
  }
)


const deleteSubmission = asyncHandler(
  async (req, res) => {
      const submission = await Submission.findById(req.params.id)
      if(!submission){
          res.status(400)
          throw new Error('Not yet submitted')
      }

      // Check for user
      if(!req.user){
          res.status(401)
          throw new Error('User not found')
      }

      await Assignment.findByIdAndUpdate(submission.assignment_id, {$pull: {submissions: submission._id}}, {new: true})
    .then(p => res.json({ id: req.params.id }))
    .catch(err => res.json(err))

      await submission.remove()

      // res.status(200).json({ id: req.params.id })
  }
)

module.exports = {
  getSubmissions,
  addSubmission,
  getAssignments,
  updateSubmission,
  deleteSubmission
};
