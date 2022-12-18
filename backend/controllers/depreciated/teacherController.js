// const asyncHandler = require("express-async-handler");
// const TeacherAssignment = require("../models/TeacherAssignments");

// // @desc    Get Assignments
// // @route   GET /api/teacher/assignments
// // @access  Private

// const getAssignments = asyncHandler(async (req, res) => {
//   const Assignments = await TeacherAssignment.find({ user: req.user.id });
//   res.status(200).json(Assignments);
// });

// // @desc    Add Assignments
// // @route   ADD /api/teacher/assignments
// // @access  Private

// const addAssignment = asyncHandler(async (req, res) => {
//   if (!req.body.name) {
//     res.status(400);
//     throw new Error("Please add assignment name");
//   }
//   if (!req.body.username) {
//     res.status(400);
//     throw new Error("Please add creator name");
//   }
//   if (!req.body.course) {
//     res.status(400);
//     throw new Error("Please select course");
//   }
//   if (!req.body.marks) {
//     res.status(400);
//     throw new Error("Please add marks");
//   }
//   if (!req.body.duedate) {
//     res.status(400);
//     throw new Error("Please add duedate");
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

//   const assignment = await TeacherAssignment.create({
//     name: req.body.name,
//     createdBy: req.body.username,
//     course: req.body.course,
//     marks: req.body.marks,
//     duedate: req.body.duedate,
//     question: url + "/uploads/teacher/" + req.file.filename,
//   });

//   res.status(200).json(assignment);
// });

// // @desc    Delete Assignments
// // @route   DELETE /api/Assignments/:id
// // @access  Private

// const deleteAssignment = asyncHandler(async (req, res) => {
//   const assignment = await TeacherAssignment.findById(req.params.id);

//   // const user = await User.findById(req.user.id)

//   // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   if (!assignment) {
//     res.status(400);
//     throw new Error("Assignment not found");
//   }

//   await assignment.remove();

//   res.status(200).json({ id: req.params.id });
// });

// // @desc    Update Assignments
// // @route   PUT /api/Assignments/:id
// // @access  Private

// const updateAssignment = asyncHandler(async (req, res) => {
//   const assignment = await TeacherAssignment.findById(req.params.id);
//   if (!assignment) {
//     res.status(400);
//     throw new Error("Assignment not found");
//   }

//   // const user = await User.findById(req.user.id)

//   // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   // Make sure the logged in user matches the Assignment user
//   // if(Assignment.user.toString() !== req.user.id){
//   //     res.status(401)
//   //     throw new Error('User not authorized')
//   // }

//   const updatedAssignment = await TeacherAssignment.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//     }
//   );

//   res.status(200).json(updatedAssignment);
// });

// module.exports = {
//   getAssignments,
//   addAssignment,
//   deleteAssignment,
//   updateAssignment,
// };
