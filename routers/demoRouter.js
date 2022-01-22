const express = require("express");
const demoRouter = express.Router();
const { demoController } = require("../controller/demo.controller");
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
demoRouter.get("/", demoController);
module.exports = {
  demoRouter,
};
