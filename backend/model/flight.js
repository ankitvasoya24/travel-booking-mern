const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true
    },
    airline: {
      type: String,
      required: true
    },

    fromCity: {
      type: String,
      required: true
    },
    fromCode: String,

    toCity: {
      type: String,
      required: true
    },
    toCode: String,

    departureDate: {
      type: Date,
      required: true
    },
    departureTime: String,

    arrivalDate: Date,
    arrivalTime: String,

    duration: String,

    price: {
      type: Number,
      required: true
    },

    seatType: {
      type: String,
      default: "Economy"
    },
    availableSeats: {
      type: Number,
      default: 0
    },

    rating: Number,
    reviewsCount: Number,

    isAvailable: {
      type: Boolean,
      default: true
    }
  }
);

module.exports = mongoose.model("Flight", flightSchema);
