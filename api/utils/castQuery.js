module.exports = (req, res, next) => {
  if (req.query.rating) req.query.rating = req.query.rating * 1;

  if (req.query.numberOfReviewers)
    req.query.numberOfReviewers = req.query.numberOfReviewers * 1;

  if (req.query.cheapestPrice)
    req.query.cheapestPrice = req.query.cheapestPrice * 1;

  if (req.query.distance) req.query.distance = req.query.distance * 1;
  if (req.query.featured) {
    if (req.query.featured == "true") {
      req.query.featured = true;
    } else if (req.query.featured == "false") {
      req.query.featured = false;
    }
  }

  next();
};
