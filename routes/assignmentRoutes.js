const express = require("express");
const router = express.Router();
const {
  getAssignments,
  addAssignment,
} = require("../controllers/assignmentController");
const { protect } = require("../middlewares/authMiddleware");
const {uploadQuestions}  = require("../middlewares/uploadMiddleware");

router
  .route("/")
  .get(protect, getAssignments)
  .post(uploadQuestions.single('question'), protect, addAssignment);
  // Route::get('/', function () {
  //   //
  //   })->middleware('first', 'second');
// router
//   .route("/:id")
//   .delete(protect, deleteAssignment)
//   .put(protect, updateAssignment);

module.exports = router;
