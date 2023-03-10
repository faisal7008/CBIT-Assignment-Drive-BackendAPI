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
  .post(protect, addAssignment); //uploadQuestions.single('question')


module.exports = router;
