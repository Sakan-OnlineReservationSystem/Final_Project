module.exports = (req, res, next) => {
  if (req.query.rating) req.query.rating = req.query.rating * 1;

  if (req.query.numberOfReviewers)
    req.query.numberOfReviewers = req.query.numberOfReviewers * 1;

  if (req.query.cheapestPrice)
    req.query.cheapestPrice = req.query.cheapestPrice * 1;

  if (req.query.distance) req.query.distance = req.query.distance * 1;
  next();
};
