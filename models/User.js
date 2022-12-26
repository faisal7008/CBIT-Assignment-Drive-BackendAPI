const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  id_no: {
    type: String,
    required: [true, 'Please add ID number'],
  },
  class_id:[{
    type: String,
    // required: [true, 'Please add the classes you belong to']
  }],
  email: {
    type: String,
    required: [true, 'Please add a email'],
    unique: true
  },
  role: {
    type: String,
    required: [true, 'Please specify a role']
  },
  isMentor: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  }
}, 
{
  timestamps: true
});

module.exports = User = mongoose.model('user', UserSchema);