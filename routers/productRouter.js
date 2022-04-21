const express=require('express');
const { addProduct, getAllProducts, getDetailProductById } = require('../controller/productController');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const productRouter=express.Router();
productRouter.post("/",authenticate,authorize(["Client"]),addProduct);
productRouter.get("/",getAllProducts);
productRouter.get("/:id",getDetailProductById);
module.exports={
    productRouter,
}