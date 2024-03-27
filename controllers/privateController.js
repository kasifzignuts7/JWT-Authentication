const privatePage = (req, res) => {
  const message = `Welcome ${req.user.email} to Private Page!`;

  return res.status(200).json({
    message: message,
  });
};

module.exports = privatePage;
