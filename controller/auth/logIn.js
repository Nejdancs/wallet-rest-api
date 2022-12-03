const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const { generateToken } = require("../../helpers");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized(`Email or password is wrong`);
    }

    const token = generateToken(user);

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            token,
            user: {
                email: user.email,
                name: user.name,
                balance: user.balance,
            },
        },
    });
};

module.exports = login;
