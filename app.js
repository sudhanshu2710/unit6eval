const express = require('express');
const morgan = require('morgan'); // fir the logs
const cors = require('cors');

const bookRouter = require('./Routes/bookRoutes');
const authorRouter = require('./Routes/authorRoutes');

const app = express();

console.log(process.env.NODE_ENV, 'this is NODE_ENV');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // this is acting as middleware for now, requestes is being processed in post request.
app.use(cors());

app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'not found',
  });
});

module.exports = app;
