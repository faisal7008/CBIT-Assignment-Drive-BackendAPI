const express = require("express");
const router = express.Router();
const {
  getSubmissions,
  addSubmission,
  updateSubmission,
  deleteSubmission
} = require("../controllers/submissionController");
const { protect } = require("../middlewares/authMiddleware");
const {uploadAnswers}  = require("../middlewares/uploadMiddleware");

router
  .route("/")
  .get(protect, getSubmissions)
  .post(protect, addSubmission); //uploadAnswers.single('answer')
router
  .route("/:id")
  .put(protect, updateSubmission)
  .delete(protect, deleteSubmission)

module.exports = router;
