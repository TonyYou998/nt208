const express = require("express");
const {
  postCard,
  getCardMyList,
  getcard,
  getCardMyId,
  getcardId,
  putCard,
} = require("../controller/createcard.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const createcardRouter = express.Router();

createcardRouter.post("/", authenticate, postCard);
createcardRouter.get("/mylist/", authenticate, getCardMyList);
createcardRouter.get("/mylist/:id/", authenticate, getCardMyId);
createcardRouter.get("/alllist/", getcard);
createcardRouter.get("/alllist/:id", getcardId);
createcardRouter.put("/edit/:id/", authenticate, putCard);

// userRouter.post("/login", checkEmptyLogin, login);
// userRouter.get("/confirmation/:token", activateAccount);

module.exports = {
  createcardRouter,
};
