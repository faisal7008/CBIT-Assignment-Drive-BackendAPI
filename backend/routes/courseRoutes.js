const express = require("express");
const router = express.Router();
const { getCourses, addCourse, deleteCourse, updateCourse } = require('../controllers/courseController')
const { adminProtect, protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getCourses).post(adminProtect, addCourse)
router.route('/:id').delete(adminProtect, deleteCourse).put(adminProtect, updateCourse)

module.exports = router;
