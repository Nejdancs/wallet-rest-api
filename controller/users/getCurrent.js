const getCurrent = async (req, res) => {
    const { email, name, balance } = req.user;
    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                name,
                balance,
            },
        },
    });
};

module.exports = getCurrent;
