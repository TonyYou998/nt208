const express = require("express");
const {
  postCard,
  getCardMyList,
  getcard,
  getCardMyId,
  getcardId,
  putCard,
  getCardIdLike,
  getCardIdComment,
  getCardIdCommentDelete,
  getCardIdCheckLike,
} = require("../controller/createcard.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadImage } = require("../middlewares/upload/upload-image");
const createcardRouter = express.Router();

createcardRouter.post("/", authenticate, postCard);
createcardRouter.get("/mylist/", authenticate, getCardMyList);
createcardRouter.get("/mylist/:id/", authenticate, getCardMyId);

createcardRouter.get("/mylist/:id/like", authenticate, getCardIdLike);
createcardRouter.get("/mylist/:id/checklike", authenticate, getCardIdCheckLike);
createcardRouter.post("/mylist/:id/comment", authenticate, getCardIdComment);
createcardRouter.delete(
  "/mylist/:id/comment",
  authenticate,
  getCardIdCommentDelete
);

createcardRouter.get("/alllist/", getcard);
createcardRouter.get("/alllist/:id", authenticate, getcardId);
createcardRouter.put("/edit/:id/", authenticate, putCard);

// userRouter.post("/login", checkEmptyLogin, login);
// userRouter.get("/confirmation/:token", activateAccount);

module.exports = {
  createcardRouter,
};
