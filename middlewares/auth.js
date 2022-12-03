const { User } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized(`Not authorized`);
        }

        const { id } = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized(`Not authorized`);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature" || error.message === "jwt expired") {
            error.status = 401;
        }
        next(error);
    }
};

module.exports = auth;
