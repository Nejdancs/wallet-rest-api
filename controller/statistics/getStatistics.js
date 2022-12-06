const getStatistics = async (req, res) => {
  const { email, name, balance } = req.user;
  const { month, year } = req.body;

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

module.exports = getStatistics;
