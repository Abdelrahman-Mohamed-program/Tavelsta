const { isValidObjectId } = require("mongoose");
const bookingsModel = require("../models/bookings");
const create = async (req, res, next) => {
  try {
    const booking = await bookingsModel({ ...req.body, user: req.user.id });

    await booking.save();

    res.status(201).json({
      message: "New booking added",
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const bookings = await bookingsModel
      .find()
      .populate("user", "email")
      .populate("destination", "title");

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const bookings = await bookingsModel
      .find({ user: userId })
      .populate("destination", "_id title");
    res.status(200).json({
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      error: "Bad request",
      message: "Id is required ",
    });
  }
  const booking = await bookingsModel.findByIdAndDelete(id);

  if (!booking) {
    return res.status(404).json({
      error: "Not found",
      message: "Booking not found",
    });
  }
  res.status(200).json({
    message: "Booking object deleted successfully",
  });
};

module.exports = {
  create,
  index,
  getUserBookings,
  destroy,
};
