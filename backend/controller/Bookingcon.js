const Booking = require("../model/Booking");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { bookingType, itemId, travelDate, persons, amount } = req.body;

    if (!bookingType || !itemId || !travelDate) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (amount === undefined || amount === null || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const booking = await Booking.create({
      bookingType,
      itemId,
      userId: req.user.id,
      userInfo: {
        name: req.user.name,
        email: req.user.email,
        mobile: req.user.mobile,
      },
      travelDate,
      persons,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN: GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalBooking: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// exports.getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("user", "name email")
//       .populate("item", "name flightNumber")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ bookings });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
