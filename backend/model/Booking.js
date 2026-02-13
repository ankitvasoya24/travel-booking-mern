const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ["flight", "hotel", "package"],
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",  
      required: true
    },

    travelDate: {
      type: Date,
      required: true
    },

    persons: {
      type: Number,
      default: 1
    },

    amount: {
      type: Number,
      required: true
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed"
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
