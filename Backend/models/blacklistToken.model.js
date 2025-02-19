const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Token expires after 1 hour, adjust as needed
  },
});

module.exports = mongoose.model("BlackListToken", blackListTokenSchema);
