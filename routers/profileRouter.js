const express = require("express");
const {
  postProfile,
  putProfile,
  getProfile,
  getProfilePublic,
} = require("../controller/profile.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const profileRouter = express.Router();

profileRouter.post("/", authenticate, postProfile);
profileRouter.get("/", authenticate, getProfile);
profileRouter.get("/:slug/", getProfilePublic);
profileRouter.put("/:id/", authenticate, putProfile);

// userRouter.post("/login", checkEmptyLogin, login);
// userRouter.get("/confirmation/:token", activateAccount);

module.exports = {
  profileRouter,
};
