const jsonCheck = (req, res, next) => {
  if (!req.is("application/json")) {
    res.set("Accept", "application/json");
    return res.status(400).json({
      error: "Bad Request",
      message: "Server only accepts JSON",
    });
  }
  next();
};

module.exports = jsonCheck;
