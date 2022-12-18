const asyncHandler = require("express-async-handler");
const Assignment = require("../models/Assignments");
const Submission = require("../models/Submissions");

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
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add name");
  }

  if (!req.body.rollno) {
    res.status(400);
    throw new Error("Please add rollno");
  }

  if (!req.body.assignmentname) {
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

  const url = req.protocol + "://" + req.get("host");

  const submission = await Submission.create({
    name: req.body.name,
    rollno: req.body.rollno,
    assignmentname: req.body.assignmentname,
    allotedmarks: "NA",
    feedback: "",
    answer: url + "/uploads/student/" + req.file.filename,
  });

  await Assignment.updateOne({name: submission.assignmentname}, {$push: {submissions: submission._id}})
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

      await Assignment.findOneAndUpdate({name: submission.assignmentname}, {$pull: {submissions: submission._id}}, {new: true})
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
