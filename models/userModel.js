const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const validator = require("validator");

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

//  static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email.");
  }

  const match = await bycrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
