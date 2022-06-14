const express = require("express");
const {
  register,
  login,
  activateAccount,
  isOtpCheck,
} = require("../controller/user.controller");
const { authorize } = require("../middlewares/auth/authorize");
const {
  checkEmptyRegister,
  checkEmptyLogin,
} = require("../middlewares/validations/checkEmpty");
const { checkExistEmail } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");

const userRouter = express.Router();
userRouter.post("/register", checkEmptyRegister, checkExistEmail, register);

userRouter.get("/isotp", authenticate, isOtpCheck);
userRouter.post("/login", checkEmptyLogin, login);
userRouter.get("/confirmation/:token", activateAccount);

module.exports = {
  userRouter,
};
