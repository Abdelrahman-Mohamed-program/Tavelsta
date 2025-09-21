const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      error: "Forbidden",
      message: "You are not authorized to perform this action",
    });
  }
  next();
};

module.exports = adminAuth;
