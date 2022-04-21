const demoController = (req, res) => {
  res.status(200).send("this is demo");
};

module.exports = {
  demoController,
};
