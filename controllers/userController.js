const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler( async (req, res) => {
    const {name, id_no, email, class_id, isMentor, role, password} = req.body
    if(!name || !id_no || !email || !role || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user exits
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists') 
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        id_no,
        email,
        class_id,
        isMentor,
        role,
        password: hashedPassword
    })

    if(user){
        res.status(201).json( {
            _id: user.id,
            name: user.name,
            id_no: user.id_no,
            email: user.email,
            role: user.role,
            isMentor: user.isMentor,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json( {
            _id: user.id,
            name: user.name,
            id_no: user.id_no,
            email: user.email,
            role: user.role,
            isMentor: user.isMentor,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private

const updateUser = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(400)
            throw new Error('User not found')
        }

         // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).json(updatedUser)
    }
)

// @desc    Delete Users
// @route   DELETE /api/users/:id
// @access  Admin

const deleteUser = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.params.id)

        // const user = await User.findById(req.user.id)

        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error('Not Authorized')
        }

        if(!user){
            res.status(400)
            throw new Error('User not found')
        }

        await user.remove()

        res.status(200).json({ id: req.params.id })
    }
)

// @desc    Get user data
// @route   GET /api/users/students
// @access  Admin

const getStudents = asyncHandler( async (req, res) => {
    const students = await User.find({role: "Student"})
    res.status(200).json(students)
})

// @desc    Get user data
// @route   GET /api/users/students
// @access  Admin

const getTeachers = asyncHandler( async (req, res) => {
    const teachers = await User.find({role: "Teacher"})
    res.status(200).json(teachers)
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler( async (req, res) => {
    // const { _id, name, email } = await User.findById(req.user.id) 
    res.status(200).json(req.user)
})

// Generate JWT
// JWT_SECRET = 'abcd1234'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })
}

module.exports = {
    registerUser, loginUser, updateUser, deleteUser, getMe, getStudents, getTeachers
}