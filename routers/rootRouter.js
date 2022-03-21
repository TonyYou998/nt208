const express = require("express");
// const { register } = require('../controller/user.controller');
const { categoryRouter } = require("./categoryRouter");
const { demoRouter } = require("./demoRouter");
const { productRouter } = require("./productRouter");
const { tagRouter } = require("./tagRouter");
const { profileRouter } = require("./profileRouter");
const { userRouter } = require("./userRouter");
const { createcardRouter } = require("./createcard");
const rootRouter = express.Router();

rootRouter.use("/demo", demoRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/tag", tagRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/profile", profileRouter);
rootRouter.use("/createcard", createcardRouter);

module.exports = {
  rootRouter,
};
