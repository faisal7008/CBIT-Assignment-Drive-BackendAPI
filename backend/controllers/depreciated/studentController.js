// const asyncHandler = require("express-async-handler");
// const StudentAssignment = require("../models/StudentAssignments");

// // @desc    Get Submisssions
// // @route   GET /api/submissions
// // @access  Private

// const getSubmissions = asyncHandler(async (req, res) => {
//   const Submissions = await StudentAssignment.find({ user: req.user.id });
//   res.status(200).json(Submissions);
// });

// // @desc    Add Submisssions
// // @route   ADD /api/s
// // @access  Private

// const addSubmission = asyncHandler(async (req, res) => {
//   if (!req.body.name) {
//     res.status(400);
//     throw new Error("Please add assignment name");
//   }
//   if (!req.body.createdBy) {
//     res.status(400);
//     throw new Error("Please add creator name");
//   }
//   if (!req.body.student) {
//     res.status(400);
//     throw new Error("Please add student name");
//   }
//   if (!req.body.rollno) {
//     res.status(400);
//     throw new Error("Please add student rollno");
//   }
//   if (!req.body.course) {
//     res.status(400);
//     throw new Error("Please select course");
//   }
//   if (!req.body.totalmarks) {
//     res.status(400);
//     throw new Error("Please add total marks");
//   }
//   if (!req.body.duedate) {
//     res.status(400);
//     throw new Error("Please add duedate");
//   }
//   if (!req.body.question) {
//     res.status(400);
//     throw new Error("Please add question");
//   }
//   if (!req.file) {
//     res.status(400);
//     throw new Error("Please upload file");
//   }

//   // Check for user
//   // if(!req.user){
//   //     res.status(401)
//   //     throw new Error('User not found')
//   // }
//   const url = req.protocol + "://" + req.get("host");

//   const submission = await StudentAssignment.create({
//     name: req.body.name,
//     createdBy: req.body.createdBy,
//     student: req.body.student,
//     rollno: req.body.rollno,
//     course: req.body.course,
//     totalmarks: req.body.totalmarks,
//     allotedmarks: req.body.allotedmarks,
//     duedate: req.body.duedate,
//     question: req.body.question,
//     answer: url + "/uploads/student/" + req.file.filename,
//   });

//   res.status(200).json(submission);
// });

// // @desc    Delete Submission
// // @route   DELETE /api/submissions/:id
// // @access  Private

// const deleteSubmission = asyncHandler(async (req, res) => {
//   const submission = await StudentAssignment.findById(req.params.id);

//   // const user = await User.findById(req.user.id)

//   // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   if (!submission) {
//     res.status(400);
//     throw new Error("Submission not found");
//   }

//   await submission.remove();

//   res.status(200).json({ id: req.params.id });
// });

// // @desc    Update Submisssions
// // @route   PUT /api/Submisssions/:id
// // @access  Private

// const updateSubmission = asyncHandler(async (req, res) => {
//   const submission = await StudentAssignment.findById(req.params.id);
//   if (!submission) {
//     res.status(400);
//     throw new Error("Submission not found");
//   }

//   // const user = await User.findById(req.user.id)

//   // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   // Make sure the logged in user matches the Submission user
//   // if(Submission.user.toString() !== req.user.id){
//   //     res.status(401)
//   //     throw new Error('User not authorized')
//   // }

//   const updatedSubmission = await StudentAssignment.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//     }
//   );

//   res.status(200).json(updatedSubmission);
// });

// module.exports = {
//   getSubmissions,
//   addSubmission,
//   deleteSubmission,
//   updateSubmission,
// };
