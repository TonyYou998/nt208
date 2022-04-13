const express=require('express');
const { addToCart, getCart, removeFromCart, adjustAmount } = require('../controller/cartController');
const cartRouter=express.Router();


cartRouter.post("/add-to-cart",addToCart);
cartRouter.get("/:userId",getCart);
cartRouter.delete("/delete",removeFromCart);
cartRouter.post("/adjust",adjustAmount);

module.exports={
    cartRouter,
}