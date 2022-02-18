const express = require("express");
const demoRouter = express.Router();
const { demoController } = require("../controller/demo.controller");
const {authenticate}=require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
/**
 * @swagger
 * /api/v1/demo:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *
 */
demoRouter.get("/",demoController);
module.exports = {
  demoRouter,
};
