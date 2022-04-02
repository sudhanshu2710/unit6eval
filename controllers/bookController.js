const Book = require('../models/bookModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const books = await features.query;

  res.status(200).json({
    status: 'success',
    result: books.length,
    data: {
      books: books,
    },
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate('author');

  if (!book) {
    return next(new AppError('No book found with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});
exports.createTour = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newBook = await Book.create(req.body);
  console.log(newBook);
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});
exports.updateTour = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // this will check the validators before update if u do false then is will directly update wont check for validation
  });

  if (!book) {
    return next(new AppError('No Book found with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Book.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No Book found with this ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
