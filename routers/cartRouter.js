const express=require('express');
const { addToCart, getCart } = require('../controller/cartController');
const cartRouter=express.Router();


cartRouter.post("/add-to-cart",addToCart);
cartRouter.get("/:userId",getCart);

module.exports={
    cartRouter,
}