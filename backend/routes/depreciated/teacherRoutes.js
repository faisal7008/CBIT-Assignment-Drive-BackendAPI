// const express = require("express");
// const router = express.Router();
// const {
//   getAssignments,
//   addAssignment,
//   deleteAssignment,
//   updateAssignment,
// } = require("../controllers/teacherController");
// const { protect } = require("../middlewares/authMiddleware");
// const {uploadQuestions}  = require("../middlewares/uploadMiddleware");

// router
//   .route("/")
//   .get(protect, getAssignments)
//   .post(uploadQuestions.single('question'), addAssignment);
//   // Route::get('/', function () {
//   //   //
//   //   })->middleware('first', 'second');
// router
//   .route("/:id")
//   .delete(protect, deleteAssignment)
//   .put(protect, updateAssignment);

// module.exports = router;
