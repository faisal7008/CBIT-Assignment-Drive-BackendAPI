const asyncHandler = require('express-async-handler')
const Course = require('../models/Courses')
const User = require('../models/User')

// @desc    Get Courses
// @route   GET /api/Courses
// @access  Private

const getCourses = asyncHandler(
    async (req, res) => {
        const courses = await Course.find({ user: req.user.id })
        res.status(200).json(courses)
    }
)

// @desc    Add Courses
// @route   ADD /api/Courses
// @access  Private

const addCourse = asyncHandler(
    async (req, res) => {
        if( !req.body.name || !req.body.semester){
            res.status(400)
            throw new Error('Please add neccessary fields')
        }

        const course = await Course.create({
            name: req.body.name,
            semester: req.body.semester,
        })

        res.status(200).json(course)
    }
)

// @desc    Delete Courses
// @route   DELETE /api/Courses/:id
// @access  Private

const deleteCourse = asyncHandler(
    async (req, res) => {
        const course = await Course.findById(req.params.id)

        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        if(!course){
            res.status(400)
            throw new Error('Course not found')
        }

        await course.remove()

        res.status(200).json({ id: req.params.id })
    }
)

// @desc    Update Courses
// @route   PUT /api/Courses/:id
// @access  Private

const updateCourse = asyncHandler(
    async (req, res) => {
        const course = await Course.findById(req.params.id)
        if(!course){
            res.status(400)
            throw new Error('Course not found')
        }
        
        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        // Make sure the logged in user matches the Course user
        // if(Course.user.toString() !== req.user.id){
        //     res.status(401)
        //     throw new Error('User not authorized')
        // }

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).json(updatedCourse)
    }
)

module.exports = {
    getCourses, addCourse, deleteCourse, updateCourse
}