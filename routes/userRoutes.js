const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser, getMe, getStudents, getTeachers } = require('../controllers/userController')
const { protect, adminProtect } = require('../middlewares/authMiddleware')

router.post('/', registerUser )
router.post('/login', loginUser )
router.get('/me', protect, getMe )
router.get('/students', protect, getStudents)
router.get('/teachers', adminProtect, getTeachers)
router.route('/:id').delete(adminProtect, deleteUser).put(protect, updateUser)

module.exports = router;
