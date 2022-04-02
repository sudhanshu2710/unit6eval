const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router
  .route('/')
  .get(authorController.getAllTours)
  .post(authorController.createTour); // chaning multiple middleware functions
router.route('/:id').get(authorController.getTour);
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
