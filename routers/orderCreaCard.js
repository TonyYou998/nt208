const express = require("express");
const {
  postOrderCard,
  getOrderCardList,
} = require("../controller/orderCreateCard");
const { authenticate } = require("../middlewares/auth/authenticate");
const createOrderCreateCardRouter = express.Router();

createOrderCreateCardRouter.post("/", authenticate, postOrderCard);
createOrderCreateCardRouter.get("/", authenticate, getOrderCardList);

module.exports = {
  createOrderCreateCardRouter,
};
