const jwt = require("jsonwebtoken");
const tokenAuth = async (req, res, next) => {
  try {
    if (req.url == "/api/v1/users/signup" || req.url == "/api/v1/users/login") {
      return next();
    }
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication required",
      });
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Invalid or expired token",
        });
      }

      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = tokenAuth;
