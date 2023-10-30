const { verifyToken } = require('../middlewares/auth');

const middlewares = () => {
  return async (req, res, next) => {
    try {
      await verifyToken(req);

      // Exit middlewares chain
      next();
    } catch (error) {
      // Jump to error middleware handler (at app.js)
      next(error);
    }
  };
};

module.exports = middlewares;
