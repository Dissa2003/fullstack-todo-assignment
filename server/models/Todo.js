const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], 
    trim: true
  },
  description: {
    type: String, 
    trim: true
  },
  done: {
    type: Boolean,
    default: false // Default done status is false [cite: 38]
  }
}, { 
  timestamps: true // Creates createdAt and updatedAt automatically [cite: 39, 40]
});

module.exports = mongoose.model('Todo', TodoSchema);