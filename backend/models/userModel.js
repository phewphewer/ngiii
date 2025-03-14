const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static create account method
userSchema.statics.create_account = async function (username, email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Emailis not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not stronk enough");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Username already in use");
  }

  // pass1234
  //   const salt = await bcrypt.genSalt(10);
  //   const hash = await bcrypt.hash(password, salt);

  const hash = await bcrypt.hash(password, 10); // Hash password with 10 salt rounds

  // create a new user
  const user = await this.create({ username, email, password: hash });
  return user;
};

module.exports = mongoose.model("User", userSchema);
