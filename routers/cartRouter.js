const express=require('express');
const { addToCart } = require('../controller/cartController');
const cartRouter=express.Router();


cartRouter.post("/add-to-cart",addToCart);

module.exports={
    cartRouter,
}