const express=require('express');
const { addProduct, getAllProducts, getDetailProductById, updateProductImage, addComment, getCommentByProductId } = require('../controller/productController');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const { uploadImage } = require('../middlewares/upload/upload-image');
const productRouter=express.Router();
productRouter.post("/",authenticate,authorize(["Client"]),addProduct);
productRouter.get("/",getAllProducts);
productRouter.get("/:id",getDetailProductById);
productRouter.post("/update-image",uploadImage("avatar"),updateProductImage);
productRouter.post("/comment",addComment);
productRouter.get("/comment/:idProduct",getCommentByProductId);
module.exports={
    productRouter,
}