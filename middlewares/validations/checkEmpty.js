const checkEmptyRegister = (req, res, next) => {
  if (Object.keys(req.body).length !== 6)
    res.status(500).send("all field must be filled");
  else next();
};
const checkEmptyLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== "" && password !== "") next();
  else
    res.status(500).send({
      message: "email or password must not be empty",
    });
};
module.exports = {
  checkEmptyRegister,
  checkEmptyLogin,
};
