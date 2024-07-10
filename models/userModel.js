const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Correct spelling of Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true, // Correct spelling of required
    unique: true,
  },
  password: {
    type: String, // Correct type definition for String
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
