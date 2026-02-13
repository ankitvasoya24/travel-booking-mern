const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    destinations: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Package", packageSchema);
