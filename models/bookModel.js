const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');

//here first we are actually discribing the data type for the data.
const bookSchema = new mongoose.Schema(
  {
    // name: String,
    name: {
      type: String,
      required: [true, 'A book must have a name'], // validator
      unique: true,
    },
    image: String,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'Author',
      required: [true, 'book must belong to a author.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
