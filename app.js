const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// routes
const users = require('./routes/userRoutes');
const courses = require('./routes/courseRoutes');
const classes = require('./routes/classRoutes');
const assignments = require('./routes/assignmentRoutes');
const submissions = require('./routes/submissionRoutes');

// use Routes
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/assignments', assignments);
app.use('/api/submissions', submissions);
app.use('/uploads/teacher', express.static('uploads/teacher'))
app.use('/uploads/student', express.static('uploads/student'))

app.use(errorHandler)

const port = process.env.PORT || 8084;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})