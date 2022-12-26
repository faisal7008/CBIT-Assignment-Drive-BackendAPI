const asyncHandler = require('express-async-handler')
const Class = require('../models/Class')
const User = require('../models/User')

// @desc    Get Classs
// @route   GET /api/Classs
// @access  Private

const getClasses = asyncHandler(
    async (req, res) => {
        const all_classes = await Class.find({ user: req.user.id })
        res.status(200).json(all_classes)
    }
)

// @desc    Get Class
// @route   GET /api/Classs
// @access  Private

const getClass = asyncHandler(
    async (req, res) => {
        const classData = await Class.findById(req.params.classId)
        res.status(200).json(classData)
    }
)

// @desc    Add Classs
// @route   ADD /api/Classs
// @access  Private

const addClass = asyncHandler(
    async (req, res) => {
        if( !req.body.name || !req.body.semester || !req.body.mentor || !req.body.courses){
            res.status(400)
            throw new Error('Please add neccessary fields')
        }

        const classData = await Class.create({
            name: req.body.name,
            semester: req.body.semester,
            mentor: req.body.mentor,
            courses: req.body.courses,
        })

        res.status(200).json(classData)
    }
)

// @desc    Delete Classs
// @route   DELETE /api/Classs/:id
// @access  Private

const deleteClass = asyncHandler(
    async (req, res) => {
        const classData = await Class.findById(req.params.classId)

        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        if(!classData){
            res.status(400)
            throw new Error('Class not found')
        }

        await classData.remove()

        res.status(200).json({ id: req.params.classId })
    }
)

// @desc    Update Classs
// @route   PUT /api/Classs/:id
// @access  Private

const updateClass = asyncHandler(
    async (req, res) => {
        const classData = await Class.findById(req.params.classId)
        if(!classData){
            res.status(400)
            throw new Error('Class not found')
        }
        
        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        // Make sure the logged in user matches the Class user
        // if(Class.user.toString() !== req.user.id){
        //     res.status(401)
        //     throw new Error('User not authorized')
        // }

        const updatedClass = await Class.findByIdAndUpdate(req.params.classId, req.body, {
            new: true,
        })

        res.status(200).json(updatedClass)
    }
)

module.exports = {
    getClasses, getClass, addClass, deleteClass, updateClass
}