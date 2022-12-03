const { User } = require("../../models");
const { Conflict } = require("http-errors");
const { generateToken } = require("../../helpers");

const signup = async (req, res) => {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`User with ${email} already exist`);
    }

    const newUser = new User({ name, email });
    const token = generateToken(newUser);

    newUser.setToken(token);
    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            token,
            user: { name: newUser.name, email: newUser.email, balance: newUser.balance },
        },
    });
};

module.exports = signup;
