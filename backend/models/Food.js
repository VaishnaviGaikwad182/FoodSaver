const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taken: {
    type: Boolean,
    default: false,
  },
  foodType: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: String, // storing time as string (HH:MM) to match your frontend
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Collected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Food", foodSchema);
