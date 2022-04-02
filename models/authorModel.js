const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

//here first we are actually discribing the data type for the data.
const authorSchema = new mongoose.Schema(
  {
    // name: String,
    name: {
      type: String,
      required: [true, 'A author must have a name'], // validator
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    role: {
      type: String,
      enum: ['author', 'reader', 'admin'],
      default: 'reader',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

authorSchema.virtual('books', {
  ref: 'Book', //schema name
  foreignField: 'author', // book schema me kis key name se ya hai
  localField: '_id', //jo bhi use schema me save hai vo yha kis name se jana jata hai?
});
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
