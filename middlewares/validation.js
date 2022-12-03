const { BadRequest } = require("http-errors");

const validation = (schema) => {
    return (req, _, next) => {
        const body = req.body;

        if (Object.keys(body).length === 0) {
            next(BadRequest("missing fields"));
        }

        const { error } = schema.validate(body);

        if (error) {
            next(BadRequest(error.message));
        }
        next();
    };
};

module.exports = validation;
