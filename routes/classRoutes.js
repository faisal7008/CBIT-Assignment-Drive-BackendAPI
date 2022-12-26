const express = require("express");
const router = express.Router();
const { getClasses, getClass, addClass, deleteClass, updateClass } = require('../controllers/classController')
const { adminProtect, mentorProtect, protect } = require('../middlewares/authMiddleware')

router.route('/').get(mentorProtect, getClasses).post(mentorProtect, addClass)
router.route('/:classId').delete(adminProtect, deleteClass).put(mentorProtect, updateClass).get(protect, getClass)

module.exports = router;
