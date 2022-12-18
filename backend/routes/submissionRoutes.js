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
  .post(uploadAnswers.single('answer'), addSubmission);
  // Route::get('/', function () {
  //   //
  //   })->middleware('first', 'second');
router
  .route("/:id")
  .put(protect, updateSubmission)
  .delete(protect, deleteSubmission)

module.exports = router;
