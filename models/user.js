const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const { emailRegExp, nameRegExp, passwordRegExp } = require("../assets/regExp");
const { handleSaveErrors } = require("../helpers");

const userSchema = Schema(
    {
        name: {
            type: String,
            minLength: 1,
            maxLength: 12,
            trim: true,
            required: [true, "Name is required"],
            match: [nameRegExp, "Please fill a valid name"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [emailRegExp, "Please fill a valid email address"],
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
    this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
};

userSchema.methods.setToken = function (token) {
    this.token = token;
};

userSchema.post("save", handleSaveErrors);

const joiRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    password: Joi.string().pattern(passwordRegExp).min(6).max(16).required().messages({
        "string.pattern.base": `Please fill a valid password`,
    }),
    name: Joi.string().pattern(nameRegExp).min(1).max(12).required().messages({
        "string.pattern.base": `Please fill a valid name`,
    }),
});

const joiLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema,
};
