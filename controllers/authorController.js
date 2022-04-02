const Author = require('../models/authorModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Author.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const authors = await features.query;

  res.status(200).json({
    status: 'success',
    result: authors.length,
    data: {
      authors: authors,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newAuthor = await Author.create(req.body);
  console.log(newAuthor);
  res.status(201).json({
    status: 'success',
    data: {
      author: newAuthor,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const author = await Author.findById(req.params.id).populate({
    path: 'books',
    select: '-__v',
  });

  res.status(200).json({
    status: 'success',
    data: {
      author,
    },
  });
});
