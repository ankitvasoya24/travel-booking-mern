const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    badge: {
      type: String,
      default: "",
    },
  }
);

module.exports = mongoose.model("Destination", destinationSchema);
