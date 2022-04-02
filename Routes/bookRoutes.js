const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllTours)
  .post(bookController.createTour); // chaning multiple middleware functions
router
  .route('/:id')
  .get(bookController.getTour)
  .patch(bookController.updateTour)
  .delete(bookController.deleteTour);

module.exports = router;
