const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).min(10).max(63).required(),
  password: Joi.string().pattern(passwordRegExp).min(6).max(12).required(),
  name: Joi.string().pattern(nameRegExp).min(1).max(12).required(),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).min(10).max(63).required(),
  password: Joi.string().pattern(passwordRegExp).min(6).max(12).required(),
});

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
