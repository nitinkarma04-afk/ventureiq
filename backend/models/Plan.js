const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  idea: String,
  location: String,
  budget: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", planSchema);