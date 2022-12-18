// const express = require("express");
// const router = express.Router();
// const {
//   getSubmissions,
//   addSubmission,
//   deleteSubmission,
//   updateSubmission,
// } = require("../controllers/studentController");
// const { protect } = require("../middlewares/authMiddleware");
// const {uploadAnswers}  = require("../middlewares/uploadMiddleware");

// router
//   .route("/")
//   .get(protect, getSubmissions)
//   .post(uploadAnswers.single('answer'), addSubmission);
//   // Route::get('/', function () {
//   //   //
//   //   })->middleware('first', 'second');
// router
//   .route("/:id")
//   .delete(protect, deleteSubmission)
//   .put(protect, updateSubmission);

// module.exports = router;
