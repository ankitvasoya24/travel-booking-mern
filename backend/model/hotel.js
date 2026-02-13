const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    amenities: {
      type: [String],
      default: []
    },
    pricePerNight: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "USD"
    },
    tags: {
      type: [String],
      default: []
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }
);

module.exports = mongoose.model("Hotels", hotelSchema);
